import { useEffect, useLayoutEffect, useRef, useState } from 'react';
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

  return (
    <div className="lightbox" onClick={onClose}>
      <img src={shown} alt={photo.alt} />
    </div>
  );
};

export const Photography = () => {
  const [open, setOpen] = useState(null);

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

      {open && <Lightbox photo={open} onClose={() => setOpen(null)} />}
    </section>
  );
};
