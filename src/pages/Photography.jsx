import { useEffect, useState } from 'react';
import { photos } from '../data/photos';

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
      <div className="gallery">
        {photos.map((photo) => (
          <button key={photo.src} className="shot" onClick={() => setOpen(photo)} aria-label={`Open ${photo.alt}`}>
            <img src={photo.src} width={photo.width} height={photo.height} alt={photo.alt} loading="lazy" />
          </button>
        ))}
      </div>

      {open && (
        <div className="lightbox" onClick={() => setOpen(null)}>
          <img src={open.src} alt={open.alt} />
        </div>
      )}
    </section>
  );
};
