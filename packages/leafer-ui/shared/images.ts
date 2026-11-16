// Images painted in code as data: URLs, standing in for the docs' image files
//
// The docs load `/image/leafer.jpg`, `/image/arrows.png`, `cursor.svg` and a missing
// `leafer-error.jpg` from their own site. Cards must not fetch, so every example takes its
// images from here. Each URL is built once per page and cached.

const cache = new Map<string, string>();

function painted(key: string, w: number, h: number, paint: (g: CanvasRenderingContext2D) => void): string {
  let url = cache.get(key);
  if (!url) {
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    paint(c.getContext('2d')!);
    url = c.toDataURL('image/png');
    cache.set(key, url);
  }
  return url;
}

/** A 400 × 300 landscape photo stand-in (sky, sun, hills, a lake): the docs' `leafer.jpg`. */
export function photo(): string {
  return painted('photo', 400, 300, (g) => {
    const sky = g.createLinearGradient(0, 0, 0, 180);
    sky.addColorStop(0, '#2b5fb8');
    sky.addColorStop(1, '#f7b267');
    g.fillStyle = sky;
    g.fillRect(0, 0, 400, 300);
    g.fillStyle = '#ffe28a';
    g.beginPath();
    g.arc(290, 120, 34, 0, Math.PI * 2);
    g.fill();
    const hill = (y: number, amp: number, color: string, phase: number): void => {
      g.fillStyle = color;
      g.beginPath();
      g.moveTo(0, 300);
      for (let x = 0; x <= 400; x += 10) g.lineTo(x, y + Math.sin(x / 60 + phase) * amp);
      g.lineTo(400, 300);
      g.fill();
    };
    hill(170, 18, '#3d6b4f', 0.5);
    hill(200, 12, '#2f5a3c', 2.1);
    const lake = g.createLinearGradient(0, 230, 0, 300);
    lake.addColorStop(0, '#5b8fd6');
    lake.addColorStop(1, '#1f3f7a');
    g.fillStyle = lake;
    g.fillRect(0, 238, 400, 62);
    g.fillStyle = 'rgba(255,226,138,0.5)';
    for (let i = 0; i < 6; i++) g.fillRect(262 + i * 3, 246 + i * 8, 56 - i * 6, 2);
    // A leaf, so a cropped or rotated image is easy to read.
    g.fillStyle = '#32cd79';
    g.beginPath();
    g.ellipse(80, 80, 40, 22, -0.6, 0, Math.PI * 2);
    g.fill();
    g.strokeStyle = '#1d7a48';
    g.lineWidth = 3;
    g.beginPath();
    g.moveTo(52, 104);
    g.lineTo(108, 56);
    g.stroke();
  });
}

/** A 60 × 60 tile with an arrow in each corner, for repeat and clip modes: the docs' `arrows.png`. */
export function arrows(): string {
  return painted('arrows', 60, 60, (g) => {
    g.fillStyle = '#fef6e4';
    g.fillRect(0, 0, 60, 60);
    g.fillStyle = '#f582ae';
    g.fillRect(0, 0, 30, 30);
    g.fillRect(30, 30, 30, 30);
    g.fillStyle = '#001858';
    const arrow = (x: number, y: number, a: number): void => {
      g.save();
      g.translate(x, y);
      g.rotate(a);
      g.beginPath();
      g.moveTo(-8, 4);
      g.lineTo(0, -6);
      g.lineTo(8, 4);
      g.closePath();
      g.fill();
      g.restore();
    };
    arrow(15, 15, 0);
    arrow(45, 15, Math.PI / 2);
    arrow(45, 45, Math.PI);
    arrow(15, 45, -Math.PI / 2);
  });
}

/**
 * An arrow cursor drawn as SVG, the docs' `cursor.svg`, as a data: URL. Leafer writes cursors as
 * an unquoted CSS `url(...)`, so quotes and brackets are escaped too.
 */
export function cursorSvg(): string {
  const svg =
    "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>" +
    "<path d='M3 2 L3 20 L8 15 L12 23 L15 21.5 L11 14 L18 14 Z' fill='#32cd79' stroke='#000' stroke-width='1.5'/></svg>";
  return `data:image/svg+xml,${encodeURIComponent(svg).replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29')}`;
}

/** An image that fails to decode without any request: the docs' missing `leafer-error.jpg`. */
export const BROKEN_IMAGE = 'data:image/png;base64,AAAA';

/** A small SVG document (a leaf badge) for the SVG element and svg exports. */
export const LEAF_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'>" +
  "<rect x='4' y='4' width='112' height='112' rx='24' fill='#1d2b53'/>" +
  "<path d='M30 88 C30 48 58 28 92 28 C92 64 72 90 30 88 Z' fill='#32cd79'/>" +
  "<path d='M34 84 L80 40' stroke='#0f5132' stroke-width='5' stroke-linecap='round'/></svg>";
