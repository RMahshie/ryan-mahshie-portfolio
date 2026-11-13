import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { albums } from '../data/photos';

const GAP = 12;
const ROW_HEIGHT = 300; // tallest a row gets; rows shrink to fit the width exactly
const NARROW = 700; // narrower than this (phones), at most two photos share a row

// rowsFor splits photos into rows that each fill the width at one shared height, so a
// tall photo never leaves a hole. A panorama (wide) gets a full-width row to itself,
// and on narrow screens a row holds at most two photos.
// A row left unfinished fills the width if that keeps it under 1.4x ROW_HEIGHT, joins
// the row before if it would cover less than half the width, and otherwise keeps
// ROW_HEIGHT rather than stretching.
const rowsFor = (photos, width) => {
  const perRow = width < NARROW ? 2 : Infinity;
  const rows = [];
  let row = [];
  let ratio = 0;
  const fill = (ps, r) => (width - GAP * (ps.length - 1)) / r;
  const finish = () => {
    if (!row.length) return;
    const prev = rows.at(-1);
    if (fill(row, ratio) <= ROW_HEIGHT * 1.4) {
      rows.push({ photos: row, height: fill(row, ratio) });
    } else if (prev && !prev.wide && ROW_HEIGHT * ratio < width / 2) {
      const merged = [...prev.photos, ...row];
      rows[rows.length - 1] = { photos: merged, height: fill(merged, merged.reduce((a, p) => a + p.width / p.height, 0)) };
    } else {
      rows.push({ photos: row, height: ROW_HEIGHT });
    }
    row = [];
    ratio = 0;
  };
  for (const photo of photos) {
    if (photo.wide) {
      finish();
      rows.push({ photos: [photo], height: (width * photo.height) / photo.width, wide: true });
      continue;
    }
    row.push(photo);
    ratio += photo.width / photo.height;
    if (fill(row, ratio) <= ROW_HEIGHT || row.length >= perRow) {
      rows.push({ photos: row, height: fill(row, ratio) });
      row = [];
      ratio = 0;
    }
  }
  finish();
  return rows;
};

const Gallery = ({ photos, onOpen }) => {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const shot = (photo, style) => (
    <button key={photo.src} className={photo.wide ? 'shot wide' : 'shot'} style={style} onClick={() => onOpen(photo)} aria-label={`Open ${photo.alt}`}>
      <img src={photo.src} width={photo.width} height={photo.height} alt={photo.alt} loading="lazy" />
    </button>
  );

  return (
    <div ref={ref} className="gallery">
      {width > 0 &&
        rowsFor(photos, width).map((row) => (
          <div key={row.photos[0].src} className="gallery-row" style={{ height: row.height }}>
            {row.photos.map((photo) => shot(photo, { width: (row.height * photo.width) / photo.height }))}
          </div>
        ))}
    </div>
  );
};

// Lightbox shows the gallery-size file at once, then swaps in the 4800 px file and
// finally the full-resolution original as each finishes downloading, in place.
const Lightbox = ({ photo, onClose }) => {
  const [shown, setShown] = useState(photo.src);

  useEffect(() => {
    setShown(photo.src);
    let cancelled = false;
    const load = (url) => new Promise((resolve) => {
      const img = new Image();
      img.onload = img.onerror = () => resolve(img.complete && img.naturalWidth > 0);
      img.src = url;
    });
    (async () => {
      for (const url of [photo.large, photo.full]) {
        if (await load(url) && !cancelled) setShown(url);
      }
    })();
    return () => { cancelled = true; };
  }, [photo]);

  // Zoom and pan happen here, not in the browser: pinching a page stops at about 5x,
  // short of a full-resolution photo's real pixels. Pinch or ctrl-scroll zooms around
  // the pointer, scrolling or dragging pans, double-click toggles actual pixels, and a
  // single click closes when not zoomed in. The view is kept in a ref and written
  // straight to the image's transform so pinching doesn't re-render React.
  const box = useRef(null);
  const img = useRef(null);

  useEffect(() => {
    const el = box.current;
    const im = img.current;
    const view = { s: 1, x: 0, y: 0 };
    const fit = () => Math.min(im.offsetWidth / photo.width, im.offsetHeight / photo.height); // css px per photo px at 1x
    const actual = () => Math.max(1, 1 / (fit() * devicePixelRatio)); // scale where 1 photo px = 1 screen px
    const draw = () => {
      im.style.transform = `translate(${view.x}px, ${view.y}px) scale(${view.s})`;
      el.classList.toggle('zoomed', view.s > 1);
    };
    const local = (cx, cy) => {
      const r = el.getBoundingClientRect();
      return [cx - r.left - im.offsetLeft, cy - r.top - im.offsetTop];
    };
    const clampPan = () => {
      view.x = Math.min(0, Math.max(im.offsetWidth * (1 - view.s), view.x));
      view.y = Math.min(0, Math.max(im.offsetHeight * (1 - view.s), view.y));
    };
    const zoomAt = (cx, cy, factor) => {
      const [px, py] = local(cx, cy);
      const s = Math.min(actual() * 2, Math.max(1, view.s * factor));
      view.x = px - ((px - view.x) * s) / view.s;
      view.y = py - ((py - view.y) * s) / view.s;
      view.s = s;
      if (s === 1) view.x = view.y = 0;
      clampPan();
      draw();
    };
    const panBy = (dx, dy) => {
      view.x += dx;
      view.y += dy;
      clampPan();
      draw();
    };

    const onWheel = (e) => {
      e.preventDefault();
      if (e.ctrlKey) zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.01)); // trackpad pinch, ctrl+wheel
      else if (view.s > 1) panBy(-e.deltaX, -e.deltaY);
    };
    // Safari reports trackpad pinches as gesture events.
    let gestureScale = 1;
    const onGestureStart = (e) => { e.preventDefault(); gestureScale = 1; };
    const onGestureChange = (e) => {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, e.scale / gestureScale);
      gestureScale = e.scale;
    };

    // Pointers: one drags, two pinch; a tap closes (when not zoomed) unless a second
    // tap follows, which toggles actual pixels.
    const pointers = new Map();
    let moved = false;
    let lastTap = null;
    let closeTimer = 0;
    const spread = () => {
      const [a, b] = [...pointers.values()];
      return [Math.hypot(a.x - b.x, a.y - b.y), (a.x + b.x) / 2, (a.y + b.y) / 2];
    };
    let pinch = 0;
    const onDown = (e) => {
      try { el.setPointerCapture(e.pointerId); } catch { /* not an active pointer */ }
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size === 1) moved = false;
      if (pointers.size === 2) [pinch] = spread();
    };
    const onMove = (e) => {
      const p = pointers.get(e.pointerId);
      if (!p) return;
      const dx = e.clientX - p.x;
      const dy = e.clientY - p.y;
      p.x = e.clientX;
      p.y = e.clientY;
      if (pointers.size === 2) {
        const [d, mx, my] = spread();
        if (pinch) zoomAt(mx, my, d / pinch);
        pinch = d;
        moved = true;
      } else if (pointers.size === 1) {
        if (Math.abs(dx) + Math.abs(dy) > 2) moved = true;
        if (view.s > 1) panBy(dx, dy);
      }
    };
    const onUp = (e) => {
      if (!pointers.delete(e.pointerId) || pointers.size) return;
      pinch = 0;
      if (moved) return;
      const now = Date.now();
      if (lastTap && now - lastTap.t < 300 && Math.hypot(e.clientX - lastTap.x, e.clientY - lastTap.y) < 30) {
        clearTimeout(closeTimer);
        lastTap = null;
        zoomAt(e.clientX, e.clientY, view.s > 1 ? 1 / view.s : actual() / view.s);
        return;
      }
      lastTap = { t: now, x: e.clientX, y: e.clientY };
      if (view.s === 1) closeTimer = setTimeout(onClose, 300);
    };
    const onCancel = (e) => { pointers.delete(e.pointerId); pinch = 0; };

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('gesturestart', onGestureStart);
    el.addEventListener('gesturechange', onGestureChange);
    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onCancel);
    draw();
    return () => {
      clearTimeout(closeTimer);
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('gesturestart', onGestureStart);
      el.removeEventListener('gesturechange', onGestureChange);
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onCancel);
    };
  }, [photo, onClose]);

  return (
    <div className="lightbox" ref={box}>
      <img ref={img} src={shown} alt={photo.alt} draggable="false" />
    </div>
  );
};

export const Photography = () => {
  const [open, setOpen] = useState(null);
  const close = useCallback(() => setOpen(null), []); // stable, so the lightbox keeps its zoom

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => e.key === 'Escape' && setOpen(null);
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <section className="page wide">
      <h2>Photography</h2>
      {albums.map((album) => (
        <div key={album.place + album.date} className="album">
          <h3 className="album-head">
            {album.place} <span className="album-date">{album.date}</span>
          </h3>
          <Gallery photos={album.photos} onOpen={setOpen} />
        </div>
      ))}

      {open && <Lightbox photo={open} onClose={close} />}
    </section>
  );
};
