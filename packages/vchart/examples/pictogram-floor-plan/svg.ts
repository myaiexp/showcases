// A floor plan as an SVG string: one named rect per room, plus an unnamed outline and labels
export interface Room {
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export const ROOMS: Room[] = [
  { name: 'Lobby', x: 20, y: 20, w: 160, h: 120 },
  { name: 'Kitchen', x: 180, y: 20, w: 120, h: 120 },
  { name: 'Office A', x: 300, y: 20, w: 180, h: 120 },
  { name: 'Meeting', x: 20, y: 140, w: 120, h: 140 },
  { name: 'Lab', x: 140, y: 140, w: 200, h: 140 },
  { name: 'Office B', x: 340, y: 140, w: 140, h: 140 },
];

export const FLOOR_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="300">
  <rect x="10" y="10" width="480" height="280" fill="none" stroke="#8a8f9c" stroke-width="3"/>
  ${ROOMS.map(
    (r) =>
      `<rect name="${r.name}" x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="#2a2f3c" stroke="#8a8f9c" stroke-width="1.5"/>` +
      `<text x="${r.x + r.w / 2}" y="${r.y + r.h / 2}" text-anchor="middle" font-size="14" fill="#e8e8e8">${r.name}</text>`,
  ).join('\n  ')}
</svg>`;
