// Photo sets, newest first. Each photo comes in three sizes: the gallery file (src),
// a 4800 px one (large) and the full-resolution original (full). The full-screen view
// shows them in that order as each downloads. width and height are the original's.
// The Photography page and its nav link only appear once there's a photo.
// in(dir) makes photo entries for public/photos/<dir>/; pass { wide: true } for a
// panorama, which gets a row of its own.
const inDir = (dir) => (name, width, height, alt, extra = {}) => ({
  src: `photos/${dir}/${name}.jpg`,
  large: `photos/${dir}/${name}-large.jpg`,
  full: `photos/${dir}/${name}-full.jpg`,
  width,
  height,
  alt,
  ...extra,
});
const yosemite = inDir('yosemite');
const landsEnd = inDir('lands-end');

export const albums = [
  {
    place: 'Yosemite',
    date: 'October 2026',
    photos: [
      yosemite('night-sky', 7008, 4672, 'Stars and the Andromeda galaxy over a silhouetted tree'),
      yosemite('dsc04517', 4672, 7008, 'El Capitan rising behind pine trees'),
      yosemite('dsc04187', 7008, 4672, 'Half Dome framed by tall pines'),
      yosemite('dsc04430', 7008, 4672, 'Granite peaks above a rocky trail'),
      yosemite('dsc04898', 7008, 4672, 'Half Dome above a granite slope dotted with pines'),
      yosemite('dsc04435', 7008, 4672, 'Granite canyon walls and pines in afternoon light'),
    ],
  },
  {
    place: 'Lands End + Fleet Week',
    date: 'October 2026',
    photos: [
      landsEnd('dsc03705', 7008, 4672, 'Blue Angels jets trailing smoke across a blue sky'),
      landsEnd('dsc03880', 7008, 4672, 'Cypress silhouette over the Pacific at Lands End'),
      landsEnd('dsc03909', 7008, 4672, 'Golden Gate Bridge beyond the cliffs at Lands End'),
      landsEnd('pano', 12105, 3745, 'Panorama of the Pacific and the Marin Headlands from Lands End, framed by a cypress', { wide: true }),
      landsEnd('dsc03946', 4672, 7008, 'Waves breaking around rocks below Lands End'),
      landsEnd('dsc03948', 4672, 7008, 'Golden Gate Bridge through cypress trees'),
      landsEnd('dsc03963', 7008, 4672, 'Birds flying past the Golden Gate Bridge'),
    ],
  },
];

export const photos = albums.flatMap((album) => album.photos);
