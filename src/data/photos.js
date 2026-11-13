// Photo sets, newest first. Each photo comes in three sizes: the gallery file (src),
// a 4800 px one (large) and the full-resolution original (full). The full-screen view
// shows them in that order as each downloads. width and height are the original's.
// The Photography page and its nav link only appear once there's a photo.
const yosemite = (name, width, height, alt) => ({
  src: `photos/yosemite/${name}.jpg`,
  large: `photos/yosemite/${name}-large.jpg`,
  full: `photos/yosemite/${name}-full.jpg`,
  width,
  height,
  alt,
});

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
];

export const photos = albums.flatMap((album) => album.photos);
