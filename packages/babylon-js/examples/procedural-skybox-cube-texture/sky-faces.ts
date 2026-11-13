// Paints six cube faces (as data URLs) for a day, dusk or night sky
export type SkyName = 'day' | 'dusk' | 'night';

type RGB = [number, number, number];
interface Palette {
  zenith: RGB;
  horizon: RGB;
  ground: RGB;
  sun: RGB;
  sunSize: number;
  stars: boolean;
}

const PALETTES: Record<SkyName, Palette> = {
  day: { zenith: [40, 100, 220], horizon: [190, 225, 255], ground: [90, 105, 90], sun: [255, 250, 220], sunSize: 0.08, stars: false },
  dusk: { zenith: [35, 30, 90], horizon: [255, 140, 80], ground: [50, 35, 40], sun: [255, 190, 110], sunSize: 0.22, stars: false },
  night: { zenith: [3, 6, 24], horizon: [25, 32, 62], ground: [10, 12, 18], sun: [235, 240, 255], sunSize: 0.05, stars: true },
};

const mix = (a: RGB, b: RGB, t: number): RGB => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

/** Sky colour for an elevation in radians (-PI/2 straight down, PI/2 straight up). */
function colourAt(p: Palette, elevation: number): RGB {
  if (elevation < 0) return mix(p.horizon, p.ground, Math.min(1, -elevation * 3));
  return mix(p.horizon, p.zenith, Math.pow(Math.min(1, elevation / (Math.PI / 2)), 0.6));
}

/**
 * Faces in CubeTexture file order: +x, +y, +z, -x, -y, -z. The colour depends only on elevation,
 * so face orientation never shows; the sun/moon sits on +x and stars are scattered per face.
 */
export function paintSkyFaces(name: SkyName, size = 256): string[] {
  const p = PALETTES[name];
  const order = ['px', 'py', 'pz', 'nx', 'ny', 'nz'];
  let seed = 7;
  const rand = (): number => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  return order.map((face) => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const g = canvas.getContext('2d')!;
    const img = g.createImageData(size, size);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const u = (x / (size - 1)) * 2 - 1;
        const v = (y / (size - 1)) * 2 - 1;
        let elevation: number;
        if (face === 'py') elevation = Math.atan(1 / Math.max(1e-4, Math.hypot(u, v)));
        else if (face === 'ny') elevation = -Math.atan(1 / Math.max(1e-4, Math.hypot(u, v)));
        else elevation = Math.atan(-v);
        let c = colourAt(p, elevation);
        if (face === 'px') {
          const d = Math.hypot(u, v + 0.15); // sun centre slightly above the horizon
          const glow = Math.max(0, 1 - d / (p.sunSize * 6)) ** 2;
          c = mix(c, p.sun, Math.min(1, glow * 0.6 + (d < p.sunSize ? 1 : 0)));
        }
        const i = (y * size + x) * 4;
        img.data[i] = c[0];
        img.data[i + 1] = c[1];
        img.data[i + 2] = c[2];
        img.data[i + 3] = 255;
      }
    }
    g.putImageData(img, 0, 0);
    if (p.stars && face !== 'ny') {
      g.fillStyle = '#fff';
      for (let s = 0; s < 70; s++) g.fillRect(rand() * size, rand() * size * (face === 'py' ? 1 : 0.5), 1.5, 1.5);
    }
    return canvas.toDataURL('image/png');
  });
}
