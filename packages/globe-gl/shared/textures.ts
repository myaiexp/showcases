// Equirectangular images painted in code: globe skins, bump, water, clouds, stars
import { geoEquirectangular, geoGraticule10, geoPath } from 'd3-geo';
import { cities, near, rng } from './places.ts';
import { land } from './world.ts';

// The docs' image props take URLs. Cards must not fetch, so each image here is painted on a
// canvas from Natural Earth land and handed back as a blob: URL, which TextureLoader reads like
// any other. Each kind is painted once per page and shared by every mount (never revoked).

export type TextureKind =
  /** Blue ocean, land shaded from green to sand to ice by latitude. */
  | 'day'
  /** Navy ocean, slate land, faint graticule: a dark data backdrop. */
  | 'dark'
  /** Black land and ocean with glowing city lights. */
  | 'night'
  /** Grey-scale height for `bumpImageUrl`: ocean black, land rough and raised. */
  | 'bump'
  /** Ocean white, land black: a specular or roughness map. */
  | 'water'
  /** White cloud bands on transparency, for a second, larger sphere. */
  | 'clouds'
  /** Stars on black, for `backgroundImageUrl`. */
  | 'stars'
  /** Cream land on pale blue: a printed-atlas look. */
  | 'atlas';

const cache = new Map<TextureKind, Promise<string>>();

/** A blob: URL of the image, painted on first use. */
export function texture(kind: TextureKind): Promise<string> {
  let p = cache.get(kind);
  if (!p) {
    p = paint(kind);
    cache.set(kind, p);
  }
  return p;
}

const W = 2048;
const H = 1024;

async function paint(kind: TextureKind): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;
  PAINTERS[kind](ctx);
  const type = kind === 'clouds' ? 'image/png' : 'image/jpeg';
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, 0.9));
  if (!blob) throw new Error(`Could not encode the ${kind} texture`);
  return URL.createObjectURL(blob);
}

const projection = geoEquirectangular()
  .scale(W / (2 * Math.PI))
  .translate([W / 2, H / 2]);

function landPath(ctx: CanvasRenderingContext2D): void {
  ctx.beginPath();
  geoPath(projection, ctx)(land);
}

/** A vertical gradient: stops at latitudes 90 → -90. */
function latGradient(ctx: CanvasRenderingContext2D, stops: [number, string][]): CanvasGradient {
  const g = ctx.createLinearGradient(0, 0, 0, H);
  for (const [lat, color] of stops) g.addColorStop((90 - lat) / 180, color);
  return g;
}

/** Specks over whatever is already drawn, clipped to the land. */
function speckleLand(ctx: CanvasRenderingContext2D, colors: string[], count: number, seed: number, size = 3): void {
  const rand = rng(seed);
  ctx.save();
  landPath(ctx);
  ctx.clip();
  for (let i = 0; i < count; i++) {
    ctx.fillStyle = colors[i % colors.length]!;
    ctx.globalAlpha = 0.15 + rand() * 0.25;
    const s = 1 + rand() * size;
    ctx.fillRect(rand() * W, rand() * H, s, s);
  }
  ctx.restore();
}

function graticule(ctx: CanvasRenderingContext2D, color: string): void {
  ctx.beginPath();
  geoPath(projection, ctx)(geoGraticule10());
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.stroke();
}

const PAINTERS: Record<TextureKind, (ctx: CanvasRenderingContext2D) => void> = {
  day(ctx) {
    ctx.fillStyle = latGradient(ctx, [[90, '#1d4a72'], [0, '#0c3260'], [-90, '#1d4a72']]);
    ctx.fillRect(0, 0, W, H);
    landPath(ctx);
    ctx.fillStyle = latGradient(ctx, [
      [90, '#f4f6f8'], [68, '#e6ecef'], [58, '#46663a'], [40, '#5c7a3e'], [28, '#c9b27a'],
      [18, '#b89a5c'], [8, '#3f6e33'], [-8, '#3a6a2f'], [-22, '#b39a62'], [-35, '#5f7c42'],
      [-55, '#6d8a55'], [-62, '#e9eef1'], [-90, '#f6f8fa'],
    ]);
    ctx.fill();
    speckleLand(ctx, ['#2c4a22', '#8a7448', '#d8c99c'], 60000, 7);
    landPath(ctx);
    ctx.strokeStyle = 'rgba(200,230,255,0.35)';
    ctx.lineWidth = 1.2;
    ctx.stroke();
  },
  dark(ctx) {
    ctx.fillStyle = '#0a1324';
    ctx.fillRect(0, 0, W, H);
    graticule(ctx, 'rgba(120,150,200,0.12)');
    landPath(ctx);
    ctx.fillStyle = '#1e2b40';
    ctx.fill();
    ctx.strokeStyle = '#43577a';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  },
  night(ctx) {
    ctx.fillStyle = '#02050c';
    ctx.fillRect(0, 0, W, H);
    landPath(ctx);
    ctx.fillStyle = '#0b111c';
    ctx.fill();
    const rand = rng(11);
    ctx.save();
    landPath(ctx);
    ctx.clip();
    for (const c of cities) {
      const [x, y] = projection([c.lng, c.lat])!;
      const r = 6 + Math.sqrt(c.pop) * 4;
      const glow = ctx.createRadialGradient(x, y, 0, x, y, r);
      glow.addColorStop(0, 'rgba(255,214,140,0.9)');
      glow.addColorStop(1, 'rgba(255,170,80,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
      for (let i = 0; i < 40 + c.pop * 25; i++) {
        const p = near(rand, c.lat, c.lng, 2 + Math.sqrt(c.pop));
        const [px, py] = projection([p.lng, p.lat])!;
        ctx.fillStyle = `rgba(255,${200 + Math.floor(rand() * 50)},${120 + Math.floor(rand() * 60)},${0.3 + rand() * 0.6})`;
        ctx.fillRect(px, py, 1.5, 1.5);
      }
    }
    ctx.restore();
  },
  bump(ctx) {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);
    landPath(ctx);
    ctx.fillStyle = '#555';
    ctx.fill();
    speckleLand(ctx, ['#fff', '#999', '#222'], 90000, 3, 6);
    // Soften the specks into hills.
    const copy = document.createElement('canvas');
    copy.width = W;
    copy.height = H;
    const c2 = copy.getContext('2d')!;
    c2.filter = 'blur(2px)';
    c2.drawImage(ctx.canvas, 0, 0);
    ctx.drawImage(copy, 0, 0);
  },
  water(ctx) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, W, H);
    landPath(ctx);
    ctx.fillStyle = '#000';
    ctx.fill();
  },
  clouds(ctx) {
    const rand = rng(5);
    ctx.filter = 'blur(10px)';
    for (let i = 0; i < 900; i++) {
      // Cloud bands: storms near the equator and the mid-latitudes.
      const band = [0, 45, -45, 60, -60][i % 5]!;
      const lat = band + (rand() - 0.5) * 30;
      const x = rand() * W;
      const y = ((90 - lat) / 180) * H;
      const rx = 10 + rand() * 50;
      ctx.fillStyle = `rgba(255,255,255,${0.15 + rand() * 0.35})`;
      for (const dx of [0, -W, W]) {
        ctx.beginPath();
        ctx.ellipse(x + dx, y, rx * 1.8, rx * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  },
  stars(ctx) {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);
    const rand = rng(9);
    // A faint band of the galaxy across the sky.
    const band = ctx.createLinearGradient(0, H * 0.3, 0, H * 0.7);
    band.addColorStop(0, 'rgba(90,100,140,0)');
    band.addColorStop(0.5, 'rgba(90,100,140,0.18)');
    band.addColorStop(1, 'rgba(90,100,140,0)');
    ctx.fillStyle = band;
    ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 6000; i++) {
      const b = rand();
      ctx.fillStyle = `rgba(255,255,255,${0.2 + b * 0.8})`;
      const s = b > 0.97 ? 2 : 1;
      ctx.fillRect(rand() * W, rand() * H, s, s);
    }
  },
  atlas(ctx) {
    ctx.fillStyle = '#b9d3e6';
    ctx.fillRect(0, 0, W, H);
    graticule(ctx, 'rgba(60,90,120,0.25)');
    landPath(ctx);
    ctx.fillStyle = '#f1e7cf';
    ctx.fill();
    ctx.strokeStyle = '#7b6a4d';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  },
};
