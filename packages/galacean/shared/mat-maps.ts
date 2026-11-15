// Material maps painted in code: normal, rough/metal, occlusion, mask, alpha
import { type Engine, type Texture2D } from '@galacean/engine';
import { canvasTexture, type Draw } from './textures.ts';

/** Per-pixel colour 0 to 255 for (u, v) in 0 to 1. */
export type Pixel = (u: number, v: number) => [number, number, number, number];

/** A repeating `size`×`size` texture whose pixels come from `fn`; `srgb: false` for data maps (normals, masks). */
export function pixelTexture(engine: Engine, fn: Pixel, { size = 128, srgb = false } = {}): Texture2D {
  const draw: Draw = (g, s) => {
    const image = g.createImageData(s, s);
    for (let y = 0; y < s; y++) {
      for (let x = 0; x < s; x++) {
        const [r, gr, b, a] = fn((x + 0.5) / s, (y + 0.5) / s);
        image.data.set([r, gr, b, a], (y * s + x) * 4);
      }
    }
    g.putImageData(image, 0, 0);
  };
  return canvasTexture(engine, draw, { size, srgb });
}

const byte = (v: number): number => Math.round(Math.min(1, Math.max(0, v)) * 255);

/** A tangent-space normal map of a grid of round domes, `cells` per side. */
export function domeNormals(engine: Engine, cells = 4, flat = 0.78): Texture2D {
  return pixelTexture(engine, (u, v) => {
    const x = ((u * cells) % 1) * 2 - 1;
    const y = ((v * cells) % 1) * 2 - 1;
    const r2 = x * x + y * y;
    const h2 = flat * flat - r2;
    if (h2 <= 0) return [128, 128, 255, 255];
    const h = Math.sqrt(h2);
    const len = Math.hypot(x, y, h);
    return [byte((x / len) * 0.5 + 0.5), byte((-y / len) * 0.5 + 0.5), byte((h / len) * 0.5 + 0.5), 255];
  });
}

/** Wavy ridges as a normal map: ridges run across u. */
export function ridgeNormals(engine: Engine, ridges = 8): Texture2D {
  return pixelTexture(engine, (_u, v) => {
    const slope = Math.cos(v * ridges * Math.PI * 2) * 0.8;
    const len = Math.hypot(slope, 1);
    return [128, byte((-slope / len) * 0.5 + 0.5), byte((1 / len) * 0.5 + 0.5), 255];
  });
}

/** Roughness in G and metallic in B: vertical bands, each band with its own pair (glTF channel layout). */
export function roughMetalBands(engine: Engine, bands = 4): Texture2D {
  return pixelTexture(engine, (u, v) => {
    const band = Math.floor(u * bands);
    const rough = 0.15 + 0.8 * ((band * 0.37) % 1);
    const metal = band % 2 === 0 ? 1 : 0;
    return [255, byte(rough + 0.1 * Math.sin(v * 30)), byte(metal), 255];
  });
}

/** Light stripes with dark crevices in the red channel: an occlusion map. */
export function crevices(engine: Engine, cells = 4): Texture2D {
  return pixelTexture(engine, (u, v) => {
    const edge = Math.min(Math.abs(((u * cells) % 1) - 0.5), Math.abs(((v * cells) % 1) - 0.5));
    const o = Math.min(1, 0.15 + edge * 6);
    return [byte(o), byte(o), byte(o), 255];
  });
}

/** Glowing orange grid lines on black: an emissive map (sRGB). */
export function glowGrid(engine: Engine, cells = 6, color: [number, number, number] = [255, 140, 40]): Texture2D {
  return pixelTexture(
    engine,
    (u, v) => {
      const edge = Math.min(Math.abs(((u * cells) % 1) - 0.5), Math.abs(((v * cells) % 1) - 0.5));
      const k = edge > 0.44 ? 1 : 0;
      return [color[0] * k, color[1] * k, color[2] * k, 255];
    },
    { srgb: true },
  );
}

/** A white-on-black mask of stripes (`vertical` across u, or across v): a strength map. */
export function stripeMask(engine: Engine, stripes = 6, vertical = true): Texture2D {
  return pixelTexture(engine, (u, v) => {
    const k = Math.floor((vertical ? u : v) * stripes) % 2 === 0 ? 1 : 0.1;
    return [byte(k), byte(k), byte(k), 255];
  });
}

/** A smooth black to white ramp along u. */
export function rampMask(engine: Engine): Texture2D {
  return pixelTexture(engine, (u) => [byte(u), byte(u), byte(u), 255]);
}

/** RG hold a swirling direction (0.5 is zero) and B the strength: an anisotropy map. */
export function swirlDirections(engine: Engine): Texture2D {
  return pixelTexture(engine, (u, v) => {
    const a = (u + v) * Math.PI * 2;
    return [byte(Math.cos(a) * 0.5 + 0.5), byte(Math.sin(a) * 0.5 + 0.5), 255, 255];
  });
}

/** Opaque dots on a transparent base (alpha 0): for alpha cutoff. */
export function dotsAlpha(engine: Engine, cells = 4, color: [number, number, number] = [240, 170, 60]): Texture2D {
  return pixelTexture(
    engine,
    (u, v) => {
      const r = Math.hypot(((u * cells) % 1) - 0.5, ((v * cells) % 1) - 0.5);
      return [color[0], color[1], color[2], r < 0.36 ? 255 : 0];
    },
    { srgb: true },
  );
}

/** Soft alpha gradient along u with a colour ramp: for blended transparency. */
export function fadeAlpha(engine: Engine): Texture2D {
  return pixelTexture(engine, (u) => [90, 180, 255, byte(u)], { srgb: true });
}

