// Icons and line textures drawn on a canvas as data: URLs, for scene.addImage
type Draw = (g: CanvasRenderingContext2D, s: number) => void;

function paint(size: number, draw: Draw): string {
  const c = document.createElement('canvas');
  c.width = size;
  c.height = size;
  const g = c.getContext('2d');
  if (!g) throw new Error('l7 images: no 2d canvas');
  draw(g, size);
  return c.toDataURL('image/png');
}

const pin: Draw = (g, s) => {
  g.fillStyle = '#ff6b6b';
  g.beginPath();
  g.arc(s / 2, s * 0.38, s * 0.3, Math.PI, 0);
  g.lineTo(s / 2, s * 0.95);
  g.closePath();
  g.fill();
  g.fillStyle = '#fff';
  g.beginPath();
  g.arc(s / 2, s * 0.38, s * 0.12, 0, Math.PI * 2);
  g.fill();
};

const star: Draw = (g, s) => {
  g.fillStyle = '#ffd166';
  g.beginPath();
  for (let i = 0; i < 10; i++) {
    const r = i % 2 ? s * 0.2 : s * 0.46;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    g.lineTo(s / 2 + r * Math.cos(a), s / 2 + r * Math.sin(a));
  }
  g.closePath();
  g.fill();
};

const plane: Draw = (g, s) => {
  g.fillStyle = '#7fdbff';
  g.translate(s / 2, s / 2);
  g.beginPath();
  g.moveTo(0, -s * 0.45);
  g.lineTo(s * 0.06, -s * 0.1);
  g.lineTo(s * 0.42, s * 0.1);
  g.lineTo(s * 0.06, s * 0.05);
  g.lineTo(s * 0.05, s * 0.3);
  g.lineTo(s * 0.16, s * 0.42);
  g.lineTo(0, s * 0.37);
  g.lineTo(-s * 0.16, s * 0.42);
  g.lineTo(-s * 0.05, s * 0.3);
  g.lineTo(-s * 0.06, s * 0.05);
  g.lineTo(-s * 0.42, s * 0.1);
  g.lineTo(-s * 0.06, -s * 0.1);
  g.closePath();
  g.fill();
};

const house: Draw = (g, s) => {
  g.fillStyle = '#a0e7a0';
  g.beginPath();
  g.moveTo(s * 0.5, s * 0.1);
  g.lineTo(s * 0.92, s * 0.48);
  g.lineTo(s * 0.8, s * 0.48);
  g.lineTo(s * 0.8, s * 0.9);
  g.lineTo(s * 0.2, s * 0.9);
  g.lineTo(s * 0.2, s * 0.48);
  g.lineTo(s * 0.08, s * 0.48);
  g.closePath();
  g.fill();
  g.fillStyle = '#1e2938';
  g.fillRect(s * 0.42, s * 0.6, s * 0.16, s * 0.3);
};

const tree: Draw = (g, s) => {
  g.fillStyle = '#7a5230';
  g.fillRect(s * 0.44, s * 0.68, s * 0.12, s * 0.26);
  g.fillStyle = '#4caf50';
  g.beginPath();
  g.moveTo(s * 0.5, s * 0.06);
  g.lineTo(s * 0.86, s * 0.72);
  g.lineTo(s * 0.14, s * 0.72);
  g.closePath();
  g.fill();
};

const ring: Draw = (g, s) => {
  g.strokeStyle = '#c792ea';
  g.lineWidth = s * 0.12;
  g.beginPath();
  g.arc(s / 2, s / 2, s * 0.36, 0, Math.PI * 2);
  g.stroke();
  g.fillStyle = '#c792ea';
  g.beginPath();
  g.arc(s / 2, s / 2, s * 0.14, 0, Math.PI * 2);
  g.fill();
};

/** An arrow pointing right along the line, for line textures (texture: true + lineTexture). */
const arrow: Draw = (g, s) => {
  g.strokeStyle = '#fff';
  g.lineWidth = s * 0.14;
  g.lineCap = 'round';
  g.lineJoin = 'round';
  g.beginPath();
  g.moveTo(s * 0.3, s * 0.2);
  g.lineTo(s * 0.7, s * 0.5);
  g.lineTo(s * 0.3, s * 0.8);
  g.stroke();
};

/** A dot, for dotted line textures. */
const dot: Draw = (g, s) => {
  g.fillStyle = '#fff';
  g.beginPath();
  g.arc(s / 2, s / 2, s * 0.28, 0, Math.PI * 2);
  g.fill();
};

const draws = { pin, star, plane, house, tree, ring, arrow, dot } as const;
export type IconName = keyof typeof draws;
export const ICONS = Object.keys(draws) as IconName[];

const cache = new Map<string, string>();

/** The icon as a data: URL (64px unless size is given), cached per page. */
export function icon(name: IconName, size = 64): string {
  const key = `${name}@${size}`;
  let url = cache.get(key);
  if (!url) {
    url = paint(size, draws[name]);
    cache.set(key, url);
  }
  return url;
}

/** A data: URL drawn by your own function, for a one-off image. */
export function drawImage(size: number, draw: Draw): string {
  return paint(size, draw);
}
