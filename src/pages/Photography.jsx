import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { albums } from '../data/photos';

const GAP = 12;
const ROW_HEIGHT = 300; // tallest a row gets; rows shrink to fit the width exactly
const COLUMNS_BELOW = 700; // narrower than this, two masonry columns read better than rows

// rowsFor splits photos into rows that each fill the width at one shared height, so a
// tall photo never leaves a hole. Leftovers that would fill less than half a row join
// the row before; otherwise the last row keeps ROW_HEIGHT rather than stretching.
const rowsFor = (photos, width) => {
  const rows = [];
  let row = [];
  let ratio = 0;
  for (const photo of photos) {
    row.push(photo);
    ratio += photo.width / photo.height;
    const height = (width - GAP * (row.length - 1)) / ratio;
    if (height <= ROW_HEIGHT) {
      rows.push({ photos: row, height });
      row = [];
      ratio = 0;
    }
  }
  if (row.length) {
    const prev = rows.at(-1);
    if (prev && ROW_HEIGHT * ratio < width / 2) {
      const merged = [...prev.photos, ...row];
      const sum = merged.reduce((a, p) => a + p.width / p.height, 0);
      rows[rows.length - 1] = { photos: merged, height: (width - GAP * (merged.length - 1)) / sum };
    } else {
      rows.push({ photos: row, height: ROW_HEIGHT });
    }
  }
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
    <button key={photo.src} className="shot" style={style} onClick={() => onOpen(photo)} aria-label={`Open ${photo.alt}`}>
      <img src={photo.src} width={photo.width} height={photo.height} alt={photo.alt} loading="lazy" />
    </button>
  );

  if (width && width < COLUMNS_BELOW) {
    return <div ref={ref} className="gallery columns">{photos.map((photo) => shot(photo))}</div>;
  }
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

// Lightbox shows the gallery-size file at once and swaps in the full-resolution one
// (a few MB) as soon as it has downloaded.
const Lightbox = ({ photo, onClose }) => {
  const [loaded, setLoaded] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setLoaded(photo.full);
    img.src = photo.full;
    return () => { img.onload = null; };
  }, [photo]);

  return (
    <div className="lightbox" onClick={onClose}>
      <img src={loaded === photo.full ? photo.full : photo.src} alt={photo.alt} />
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
