// Sample pictures drawn in code (no files, no network), as data URLs for <img>

export type PictureKind = 'landscape' | 'city' | 'flowers' | 'portrait' | 'poster' | 'testcard';

export const PICTURE_KINDS: readonly PictureKind[] = ['landscape', 'city', 'flowers', 'portrait', 'poster', 'testcard'];

const W = 480;
const H = 320;
const cache = new Map<PictureKind, string>();

function rng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function landscape(g: CanvasRenderingContext2D): void {
  const sky = g.createLinearGradient(0, 0, 0, H * 0.62);
  sky.addColorStop(0, '#1b2a6b');
  sky.addColorStop(0.55, '#e0567a');
  sky.addColorStop(1, '#ffc46b');
  g.fillStyle = sky;
  g.fillRect(0, 0, W, H);
  g.fillStyle = '#fff2c4';
  g.beginPath();
  g.arc(W * 0.62, H * 0.5, 44, 0, Math.PI * 2);
  g.fill();
  const ranges: [string, number, number][] = [
    ['#5a2d6e', 0.48, 1.3],
    ['#3a1f55', 0.56, 2.1],
    ['#221338', 0.64, 3.4],
  ];
  for (const [color, base, f] of ranges) {
    g.fillStyle = color;
    g.beginPath();
    g.moveTo(0, H);
    for (let x = 0; x <= W; x += 8) {
      g.lineTo(x, H * base + Math.sin(x * 0.012 * f) * 22 + Math.sin(x * 0.031 * f + f) * 10);
    }
    g.lineTo(W, H);
    g.fill();
  }
  const sea = g.createLinearGradient(0, H * 0.72, 0, H);
  sea.addColorStop(0, '#f08a6b');
  sea.addColorStop(1, '#16123a');
  g.fillStyle = sea;
  g.fillRect(0, H * 0.72, W, H * 0.28);
  g.fillStyle = 'rgba(255, 242, 196, 0.7)';
  for (let i = 0; i < 9; i++) g.fillRect(W * 0.62 - 40 + i * 3, H * 0.75 + i * 8, 80 - i * 6, 2);
}

function city(g: CanvasRenderingContext2D): void {
  const r = rng(7);
  const sky = g.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, '#05060f');
  sky.addColorStop(1, '#1a1440');
  g.fillStyle = sky;
  g.fillRect(0, 0, W, H);
  g.fillStyle = '#ffffff';
  for (let i = 0; i < 60; i++) g.fillRect(r() * W, r() * H * 0.4, 1.2, 1.2);
  let x = 0;
  while (x < W) {
    const w = 26 + r() * 40;
    const h = 80 + r() * 170;
    g.fillStyle = '#0b0d1c';
    g.fillRect(x, H - h, w - 3, h);
    for (let wy = H - h + 8; wy < H - 6; wy += 10) {
      for (let wx = x + 4; wx < x + w - 8; wx += 8) {
        if (r() < 0.45) {
          g.fillStyle = r() < 0.8 ? '#ffd27a' : '#7ad8ff';
          g.fillRect(wx, wy, 4, 5);
        }
      }
    }
    x += w;
  }
  const neon: [string, number, number][] = [
    ['#ff3fa4', 70, 150],
    ['#3ff8ff', 300, 120],
    ['#fff35c', 410, 180],
  ];
  for (const [color, nx, ny] of neon) {
    g.fillStyle = color;
    g.shadowColor = color;
    g.shadowBlur = 18;
    g.fillRect(nx, ny, 46, 8);
  }
  g.shadowBlur = 0;
}

function flowers(g: CanvasRenderingContext2D): void {
  const r = rng(11);
  g.fillStyle = '#183b1f';
  g.fillRect(0, 0, W, H);
  for (let i = 0; i < 260; i++) {
    g.strokeStyle = `hsl(${100 + r() * 40}, 50%, ${18 + r() * 20}%)`;
    g.lineWidth = 2;
    const sx = r() * W;
    g.beginPath();
    g.moveTo(sx, H);
    g.quadraticCurveTo(sx + (r() - 0.5) * 40, H * 0.6, sx + (r() - 0.5) * 30, H * (0.2 + r() * 0.5));
    g.stroke();
  }
  const hues = [350, 45, 280, 15, 200];
  for (let i = 0; i < 22; i++) {
    const cx = r() * W;
    const cy = 30 + r() * (H - 60);
    const size = 12 + r() * 22;
    const hue = hues[i % hues.length]!;
    for (let p = 0; p < 6; p++) {
      const a = (p / 6) * Math.PI * 2 + r();
      g.fillStyle = `hsl(${hue}, 85%, ${55 + r() * 15}%)`;
      g.beginPath();
      g.ellipse(cx + Math.cos(a) * size * 0.6, cy + Math.sin(a) * size * 0.6, size * 0.55, size * 0.3, a, 0, Math.PI * 2);
      g.fill();
    }
    g.fillStyle = '#ffd84a';
    g.beginPath();
    g.arc(cx, cy, size * 0.28, 0, Math.PI * 2);
    g.fill();
  }
}

function portrait(g: CanvasRenderingContext2D): void {
  const bg = g.createRadialGradient(W * 0.5, H * 0.4, 20, W * 0.5, H * 0.5, W * 0.6);
  bg.addColorStop(0, '#2f6f8f');
  bg.addColorStop(1, '#0d1b2a');
  g.fillStyle = bg;
  g.fillRect(0, 0, W, H);
  g.fillStyle = '#e8a87c';
  g.beginPath();
  g.ellipse(W * 0.5, H * 0.95, 120, 70, 0, Math.PI, 0);
  g.fill();
  g.fillStyle = '#f2c09b';
  g.beginPath();
  g.ellipse(W * 0.5, H * 0.45, 62, 78, 0, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = '#3b2216';
  g.beginPath();
  g.ellipse(W * 0.5, H * 0.32, 70, 50, 0, Math.PI, 0);
  g.fill();
  g.fillStyle = '#1b1b2f';
  for (const dx of [-24, 24]) {
    g.beginPath();
    g.ellipse(W * 0.5 + dx, H * 0.45, 7, 9, 0, 0, Math.PI * 2);
    g.fill();
  }
  g.strokeStyle = '#a3473a';
  g.lineWidth = 4;
  g.beginPath();
  g.arc(W * 0.5, H * 0.56, 18, 0.15 * Math.PI, 0.85 * Math.PI);
  g.stroke();
  g.fillStyle = '#ffd34d';
  g.fillRect(W * 0.5 - 120, H * 0.86, 240, 10);
}

function poster(g: CanvasRenderingContext2D): void {
  g.fillStyle = '#f4efe6';
  g.fillRect(0, 0, W, H);
  const colors = ['#e63946', '#1d3557', '#f4a261', '#2a9d8f'];
  colors.forEach((c, i) => {
    g.fillStyle = c;
    g.beginPath();
    g.arc(90 + i * 100, 110, 70 - i * 6, 0, Math.PI * 2);
    g.fill();
  });
  g.fillStyle = '#111';
  g.font = '900 86px system-ui, sans-serif';
  g.textBaseline = 'alphabetic';
  g.fillText('VFX', 26, 290);
  g.font = '700 26px system-ui, sans-serif';
  g.fillText('VISUAL EFFECTS', 230, 252);
  g.fillText('FOR THE WEB', 230, 286);
}

function testcard(g: CanvasRenderingContext2D): void {
  const bars = ['#c0c0c0', '#c0c000', '#00c0c0', '#00c000', '#c000c0', '#c00000', '#0000c0'];
  bars.forEach((c, i) => {
    g.fillStyle = c;
    g.fillRect((i * W) / bars.length, 0, W / bars.length + 1, H * 0.66);
  });
  for (let i = 0; i < 16; i++) {
    const v = Math.round((i / 15) * 255);
    g.fillStyle = `rgb(${v}, ${v}, ${v})`;
    g.fillRect((i * W) / 16, H * 0.66, W / 16 + 1, H * 0.14);
  }
  g.fillStyle = '#101010';
  g.fillRect(0, H * 0.8, W, H * 0.2);
  g.strokeStyle = '#fff';
  g.lineWidth = 3;
  g.beginPath();
  g.arc(W / 2, H * 0.42, 90, 0, Math.PI * 2);
  g.stroke();
  for (let i = 0; i < 24; i++) {
    g.fillStyle = i % 2 ? '#fff' : '#000';
    g.fillRect(40 + i * 17, H * 0.84, 17, 30);
  }
}

const painters: Record<PictureKind, (g: CanvasRenderingContext2D) => void> = {
  landscape,
  city,
  flowers,
  portrait,
  poster,
  testcard,
};

/** The picture as a PNG data URL, 480×320, drawn once per page. */
export function pictureUrl(kind: PictureKind): string {
  let url = cache.get(kind);
  if (!url) {
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    painters[kind](canvas.getContext('2d')!);
    url = canvas.toDataURL('image/png');
    cache.set(kind, url);
  }
  return url;
}

/** An <img> of the picture, resolved once it has loaded. `width` is its CSS width in px. */
export async function picture(kind: PictureKind, width = 360): Promise<HTMLImageElement> {
  const img = new Image();
  img.className = 'vx-pic';
  img.alt = `${kind} picture`;
  img.width = width;
  img.height = Math.round((width * H) / W);
  img.src = pictureUrl(kind);
  await img.decode();
  return img;
}
