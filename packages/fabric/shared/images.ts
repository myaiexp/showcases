// Pictures painted in code for image, filter and pattern examples: no files
//
// The guides load photos from fabricjs.com (pug.jpg and friends). Here every picture is drawn on
// a canvas: pass the canvas to `new FabricImage(el)`, or its data URL to `FabricImage.fromURL`.

export type Picture = 'landscape' | 'fruit' | 'portrait' | 'city';

function rng(seed: number): () => number {
  let s = seed >>> 0 || 1;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

function canvas(w: number, h: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return [c, c.getContext('2d')!];
}

function landscape(g: CanvasRenderingContext2D, w: number, h: number, r: () => number): void {
  const sky = g.createLinearGradient(0, 0, 0, h * 0.62);
  sky.addColorStop(0, '#1d3b72');
  sky.addColorStop(0.55, '#e3866b');
  sky.addColorStop(1, '#f6c77a');
  g.fillStyle = sky;
  g.fillRect(0, 0, w, h);
  g.fillStyle = '#fff1c4';
  g.beginPath();
  g.arc(w * 0.68, h * 0.42, h * 0.09, 0, Math.PI * 2);
  g.fill();
  const ridge = (base: number, amp: number, color: string): void => {
    g.fillStyle = color;
    g.beginPath();
    g.moveTo(0, h);
    for (let x = 0; x <= w; x += w / 24) g.lineTo(x, base - amp * (0.5 + 0.5 * Math.sin(x * 0.02 + r() * 2)) - r() * amp * 0.4);
    g.lineTo(w, h);
    g.fill();
  };
  ridge(h * 0.6, h * 0.22, '#5b4a78');
  ridge(h * 0.66, h * 0.14, '#3a3560');
  const lake = g.createLinearGradient(0, h * 0.66, 0, h);
  lake.addColorStop(0, '#e9a27a');
  lake.addColorStop(1, '#203a63');
  g.fillStyle = lake;
  g.fillRect(0, h * 0.66, w, h * 0.34);
  g.fillStyle = '#1b2a2a';
  for (let i = 0; i < 9; i++) {
    const x = r() * w * 0.4;
    const s = h * (0.08 + r() * 0.1);
    g.beginPath();
    g.moveTo(x, h * 0.7 - s);
    g.lineTo(x - s * 0.35, h * 0.72);
    g.lineTo(x + s * 0.35, h * 0.72);
    g.fill();
  }
}

function fruit(g: CanvasRenderingContext2D, w: number, h: number, r: () => number): void {
  g.fillStyle = '#2e2a3a';
  g.fillRect(0, 0, w, h);
  g.fillStyle = '#7a5434';
  g.fillRect(0, h * 0.68, w, h * 0.32);
  const colors = ['#e94b3c', '#f2b134', '#7cbf3d', '#a33ea1', '#f07c2a', '#d8324c'];
  for (let i = 0; i < 7; i++) {
    const x = w * (0.15 + 0.7 * (i / 6)) + (r() - 0.5) * 20;
    const rad = h * (0.1 + r() * 0.07);
    const y = h * 0.68 - rad * 0.7;
    const grad = g.createRadialGradient(x - rad * 0.35, y - rad * 0.35, rad * 0.1, x, y, rad);
    grad.addColorStop(0, '#fff8');
    grad.addColorStop(0.25, colors[i % colors.length]!);
    grad.addColorStop(1, '#1118');
    g.fillStyle = grad;
    g.beginPath();
    g.arc(x, y, rad, 0, Math.PI * 2);
    g.fill();
  }
}

function portrait(g: CanvasRenderingContext2D, w: number, h: number): void {
  const bg = g.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#3fa7a0');
  bg.addColorStop(1, '#22406b');
  g.fillStyle = bg;
  g.fillRect(0, 0, w, h);
  const cx = w / 2;
  const s = Math.min(w, h);
  g.fillStyle = '#f0b48a';
  g.beginPath();
  g.ellipse(cx, h * 0.42, s * 0.2, s * 0.25, 0, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = '#c94f3d';
  g.beginPath();
  g.ellipse(cx, h * 1.02, s * 0.42, s * 0.3, 0, Math.PI, 0);
  g.fill();
  g.fillStyle = '#3b2418';
  g.beginPath();
  g.ellipse(cx, h * 0.3, s * 0.22, s * 0.13, 0, Math.PI, 0);
  g.fill();
  g.fillStyle = '#222';
  for (const dx of [-1, 1]) {
    g.beginPath();
    g.arc(cx + dx * s * 0.08, h * 0.42, s * 0.022, 0, Math.PI * 2);
    g.fill();
  }
  g.strokeStyle = '#8a3b2c';
  g.lineWidth = s * 0.015;
  g.beginPath();
  g.arc(cx, h * 0.47, s * 0.07, 0.2, Math.PI - 0.2);
  g.stroke();
}

function city(g: CanvasRenderingContext2D, w: number, h: number, r: () => number): void {
  g.fillStyle = '#0d1430';
  g.fillRect(0, 0, w, h);
  for (let i = 0; i < 60; i++) {
    g.fillStyle = `rgba(255,255,255,${0.3 + r() * 0.7})`;
    g.fillRect(r() * w, r() * h * 0.5, 1.5, 1.5);
  }
  let x = 0;
  while (x < w) {
    const bw = w * (0.06 + r() * 0.08);
    const bh = h * (0.25 + r() * 0.5);
    g.fillStyle = ['#1d2950', '#26335f', '#18213f'][Math.floor(r() * 3)]!;
    g.fillRect(x, h - bh, bw - 2, bh);
    for (let wy = h - bh + 6; wy < h - 6; wy += 9) {
      for (let wx = x + 4; wx < x + bw - 8; wx += 7) {
        if (r() < 0.45) {
          g.fillStyle = r() < 0.8 ? '#ffd76a' : '#7fd3ff';
          g.fillRect(wx, wy, 3, 4);
        }
      }
    }
    x += bw;
  }
}

/** A picture painted on a new canvas, the same every time for the same arguments. */
export function picture(kind: Picture = 'landscape', w = 320, h = 220, seed = 7): HTMLCanvasElement {
  const [c, g] = canvas(w, h);
  const r = rng(seed);
  if (kind === 'landscape') landscape(g, w, h, r);
  else if (kind === 'fruit') fruit(g, w, h, r);
  else if (kind === 'portrait') portrait(g, w, h);
  else city(g, w, h, r);
  return c;
}

/** The same picture as a PNG data: URL, for `FabricImage.fromURL` and SVG `<image href>`. */
export function pictureURL(kind: Picture = 'landscape', w = 320, h = 220, seed = 7): string {
  return picture(kind, w, h, seed).toDataURL('image/png');
}

/** A small repeating tile for Pattern examples: stripes, dots or checks. */
export function tile(kind: 'stripes' | 'dots' | 'checks' = 'dots', size = 24, a = '#e94b3c', b = '#f6f3ec'): HTMLCanvasElement {
  const [c, g] = canvas(size, size);
  g.fillStyle = b;
  g.fillRect(0, 0, size, size);
  g.fillStyle = a;
  if (kind === 'dots') {
    g.beginPath();
    g.arc(size / 2, size / 2, size * 0.28, 0, Math.PI * 2);
    g.fill();
  } else if (kind === 'checks') {
    g.fillRect(0, 0, size / 2, size / 2);
    g.fillRect(size / 2, size / 2, size / 2, size / 2);
  } else {
    g.beginPath();
    g.moveTo(0, size);
    g.lineTo(size / 2, 0);
    g.lineTo(size, 0);
    g.lineTo(size / 2, size);
    g.fill();
  }
  return c;
}
