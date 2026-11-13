// Photo sets, newest first. Each photo has a gallery-size file (src) and a larger
// one for the full-screen view (full); width and height are the full file's.
// The Photography page and its nav link only appear once there's a photo.
const yosemite = (name, width, height, alt) => ({
  src: `photos/yosemite/${name}.jpg`,
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
      yosemite('night-sky', 4800, 3200, 'Stars and the Andromeda galaxy over a silhouetted tree'),
      yosemite('dsc04517', 3200, 4800, 'El Capitan rising behind pine trees'),
      yosemite('dsc04187', 4800, 3200, 'Half Dome framed by tall pines'),
      yosemite('dsc04430', 4800, 3200, 'Granite peaks above a rocky trail'),
      yosemite('dsc04435', 4800, 3200, 'Granite canyon walls and pines in afternoon light'),
      yosemite('dsc04898', 4800, 3200, 'Half Dome above a granite slope dotted with pines'),
    ],
  },
];

export const photos = albums.flatMap((album) => album.photos);
