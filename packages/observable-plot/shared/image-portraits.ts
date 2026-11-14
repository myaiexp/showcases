// Generated portrait and backdrop images (data URLs), so image marks never fetch
const skins = ['#f1c9a5', '#e0ac82', '#c68642', '#8d5524', '#f5d6b8'];
const hairs = ['#2b2118', '#6b4a2b', '#b5b5b5', '#d8d8d8', '#8a5a2b', '#111111'];

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

const url = (svg: string): string => `data:image/svg+xml,${encodeURIComponent(svg)}`;

/** A 120x160 head-and-shoulders drawing, coloured by the name: stands in for a photo. */
export function portrait(name: string): string {
  const h = hash(name);
  const hue = h % 360;
  const skin = skins[(h >>> 3) % skins.length];
  const hair = hairs[(h >>> 7) % hairs.length];
  const wide = 24 + ((h >>> 11) % 6);
  return url(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 160">` +
      `<rect width="120" height="160" fill="hsl(${hue} 35% 32%)"/>` +
      `<path d="M8 160Q8 112 60 108Q112 112 112 160Z" fill="hsl(${(hue + 40) % 360} 40% 22%)"/>` +
      `<path d="M50 104H70V120L60 130L50 120Z" fill="#f4f4f4"/>` +
      `<ellipse cx="60" cy="56" rx="${wide + 3}" ry="34" fill="${hair}"/>` +
      `<ellipse cx="60" cy="68" rx="${wide}" ry="28" fill="${skin}"/>` +
      `<circle cx="50" cy="68" r="2.5" fill="#222"/><circle cx="70" cy="68" r="2.5" fill="#222"/>` +
      `<path d="M52 82Q60 88 68 82" stroke="#733" stroke-width="2" fill="none"/>` +
    `</svg>`,
  );
}

/** A wide pale-blue and white drift of ice floes, for a plot's CSS background. */
export function iceBackdrop(): string {
  let s = 7;
  const rnd = (): number => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
  let floes = '';
  for (let i = 0; i < 38; i++) {
    const x = rnd() * 800;
    const y = rnd() * 500;
    const w = 40 + rnd() * 120;
    const h = 20 + rnd() * 50;
    floes += `<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="${w.toFixed(0)}" ry="${h.toFixed(0)}" fill="hsl(200 40% ${(82 + rnd() * 16).toFixed(0)}%)" transform="rotate(${(rnd() * 60 - 30).toFixed(0)} ${x.toFixed(0)} ${y.toFixed(0)})"/>`;
  }
  return url(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" preserveAspectRatio="none">` +
      `<rect width="800" height="500" fill="#2f6f95"/>${floes}</svg>`,
  );
}

/** An 8x8 pixel-art PNG (a smiling face) that looks blocky only with imageRendering: pixelated. */
export function pixelFace(): string {
  const rows = ['..yyyy..', '.yyyyyy.', 'yykyykyy', 'yyyyyyyy', 'ykyyyyky', 'yykkkkyy', '.yyyyyy.', '..yyyy..'];
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 8;
  const g = canvas.getContext('2d');
  if (!g) return '';
  rows.forEach((row, y) =>
    [...row].forEach((c, x) => {
      if (c === '.') return;
      g.fillStyle = c === 'k' ? '#3a2a10' : '#f2c230';
      g.fillRect(x, y, 1, 1);
    }),
  );
  return canvas.toDataURL('image/png');
}
