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
      yosemite('night-sky', 2400, 1600, 'Stars and the Andromeda galaxy over a silhouetted tree'),
      yosemite('dsc04517', 1600, 2400, 'El Capitan rising behind pine trees'),
      yosemite('dsc04187', 2400, 1600, 'Half Dome framed by tall pines'),
      yosemite('dsc04430', 2400, 1600, 'Granite peaks above a rocky trail'),
      yosemite('dsc04435', 2400, 1600, 'Granite canyon walls and pines in afternoon light'),
      yosemite('dsc04898', 2400, 1600, 'Half Dome above a granite slope dotted with pines'),
    ],
  },
];

export const photos = albums.flatMap((album) => album.photos);
