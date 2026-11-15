// Textures drawn in code as data: URLs: a globe map, snowflakes, a terrain pair for planes
import { drawImage } from './images.ts';
import { countries } from './world.ts';

type Ring = number[][];
let globe: string | undefined;

/** An equirectangular world map (1024 x 512) of the Natural Earth countries: the Earth layer's surface texture. */
export function globeTexture(): string {
  if (globe) return globe;
  const c = document.createElement('canvas');
  c.width = 1024;
  c.height = 512;
  const g = c.getContext('2d');
  if (!g) throw new Error('l7 textures: no 2d canvas');
  const sea = g.createLinearGradient(0, 0, 0, 512);
  sea.addColorStop(0, '#0d2a4a');
  sea.addColorStop(0.5, '#14456e');
  sea.addColorStop(1, '#0d2a4a');
  g.fillStyle = sea;
  g.fillRect(0, 0, 1024, 512);
  g.strokeStyle = 'rgba(255,255,255,.08)';
  for (let lng = -180; lng <= 180; lng += 30) {
    g.beginPath();
    g.moveTo(((lng + 180) / 360) * 1024, 0);
    g.lineTo(((lng + 180) / 360) * 1024, 512);
    g.stroke();
  }
  for (let lat = -90; lat <= 90; lat += 30) {
    g.beginPath();
    g.moveTo(0, ((90 - lat) / 180) * 512);
    g.lineTo(1024, ((90 - lat) / 180) * 512);
    g.stroke();
  }
  const trace = (ring: Ring): void => {
    ring.forEach(([lng = 0, lat = 0], i) => {
      const x = ((lng + 180) / 360) * 1024;
      const y = ((90 - lat) / 180) * 512;
      if (i === 0) g.moveTo(x, y);
      else g.lineTo(x, y);
    });
  };
  g.fillStyle = '#3f7d4f';
  g.strokeStyle = '#a8d5a2';
  g.lineWidth = 0.8;
  for (const f of countries.features) {
    const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.type === 'MultiPolygon' ? f.geometry.coordinates : [];
    for (const poly of polys) {
      g.beginPath();
      for (const ring of poly) trace(ring);
      g.fill('evenodd');
      g.stroke();
    }
  }
  globe = c.toDataURL('image/png');
  return globe;
}

/** A soft white flake, for sprite layers. */
export function snowflake(): string {
  return drawImage(64, (g, s) => {
    const grad = g.createRadialGradient(s / 2, s / 2, 1, s / 2, s / 2, s / 2);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.5, 'rgba(220,235,255,.7)');
    grad.addColorStop(1, 'rgba(220,235,255,0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, s, s);
  });
}

/** A warm spark, a second sprite texture. */
export function spark(): string {
  return drawImage(64, (g, s) => {
    const grad = g.createRadialGradient(s / 2, s / 2, 1, s / 2, s / 2, s / 2);
    grad.addColorStop(0, 'rgba(255,240,150,1)');
    grad.addColorStop(0.4, 'rgba(255,140,40,.8)');
    grad.addColorStop(1, 'rgba(255,60,0,0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, s, s);
  });
}

/** Height of the made-up hill terrain at u, v in 0..1. */
function hill(u: number, v: number): number {
  const a = Math.exp(-(((u - 0.35) ** 2 + (v - 0.4) ** 2) / 0.03));
  const b = Math.exp(-(((u - 0.7) ** 2 + (v - 0.65) ** 2) / 0.02));
  return Math.min(1, a + 0.8 * b + 0.06 * Math.sin(u * 30) * Math.sin(v * 24));
}

/** A height map: the red channel holds the height (0..255), which rgb2height turns into units. */
export function heightMap(size = 128): string {
  return drawImage(size, (g, s) => {
    const img = g.createImageData(s, s);
    for (let y = 0; y < s; y++) {
      for (let x = 0; x < s; x++) {
        const i = (y * s + x) * 4;
        img.data[i] = Math.round(Math.max(0, hill(x / s, y / s)) * 255);
        img.data[i + 3] = 255;
      }
    }
    g.putImageData(img, 0, 0);
  });
}

/** The colour picture draped over the terrain: water, grass, rock and snow by the same height. */
export function terrainColors(size = 256): string {
  return drawImage(size, (g, s) => {
    const img = g.createImageData(s, s);
    for (let y = 0; y < s; y++) {
      for (let x = 0; x < s; x++) {
        const h = hill(x / s, y / s);
        const [r, gr, b] = h < 0.08 ? [30, 90, 150] : h < 0.4 ? [70, 140, 80] : h < 0.7 ? [140, 110, 80] : [240, 240, 245];
        const i = (y * s + x) * 4;
        img.data[i] = r;
        img.data[i + 1] = gr;
        img.data[i + 2] = b;
        img.data[i + 3] = 255;
      }
    }
    g.putImageData(img, 0, 0);
  });
}
