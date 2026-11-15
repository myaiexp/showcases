// A baked ambient-light (.env) file generated in code: studio sky, SH, mips
//
// The docs load ambient light from a baked `.env` file on their CDN (AssetType.Env). Its
// layout is in the EnvLoader source: 27 floats of SH3 diffuse coefficients, a uint16 face
// size, then for each mip level each of the six faces as RGBA8 in RGBM (rgb * a * 5). This
// builds one from a procedural studio (a blue-grey sky over a dark floor, with two soft
// lights) so PBR examples get image-based lighting with no download. Each engine loads it
// through the real loader from a blob URL: `loadStudioEnv(engine)`.
import { AmbientLight, AssetType, Color, type Engine, SphericalHarmonics3, Vector3 } from '@galacean/engine';

const SIZE = 64;
const SOURCE = 12; // faces of the low-res radiance cube each mip is filtered from
const RANGE = 5; // RGBM range the engine's shader decodes with

type Rgb = [number, number, number];

/** Studio radiance in a direction (y up), in linear units. */
function radiance(x: number, y: number, z: number): Rgb {
  const sky = Math.max(0, y);
  let r = 0.06 + 0.22 * sky;
  let g = 0.07 + 0.26 * sky;
  let b = 0.09 + 0.36 * sky;
  if (y < 0) {
    const floor = 0.05 + 0.03 * Math.exp(y * 6);
    r = g = b = floor;
  }
  // Two soft boxes: a warm key up front-right and a cool rim behind.
  const key = Math.max(0, (x * 0.55 + y * 0.6 + z * 0.58) / 1.0);
  const rim = Math.max(0, -x * 0.5 + y * 0.45 - z * 0.74);
  const k = key ** 48 * 9;
  const m = rim ** 32 * 4;
  return [r + k * 1.0 + m * 0.55, g + k * 0.92 + m * 0.7, b + k * 0.8 + m * 1.0];
}

/** Direction of a texel centre on a cube face, GL face order (+X, -X, +Y, -Y, +Z, -Z). */
function direction(face: number, u: number, v: number, out: Vector3): Vector3 {
  const a = 2 * u - 1;
  const b = 2 * v - 1;
  switch (face) {
    case 0: out.set(1, -b, -a); break;
    case 1: out.set(-1, -b, a); break;
    case 2: out.set(a, 1, b); break;
    case 3: out.set(a, -1, -b); break;
    case 4: out.set(a, -b, 1); break;
    default: out.set(-a, -b, -1);
  }
  return out.normalize();
}

interface Sample { d: Vector3; c: Rgb; w: number }

function sourceSamples(): Sample[] {
  const samples: Sample[] = [];
  for (let face = 0; face < 6; face++) {
    for (let j = 0; j < SOURCE; j++) {
      for (let i = 0; i < SOURCE; i++) {
        const u = (i + 0.5) / SOURCE;
        const v = (j + 0.5) / SOURCE;
        const d = direction(face, u, v, new Vector3());
        const a = 2 * u - 1;
        const b = 2 * v - 1;
        const w = 4 / (SOURCE * SOURCE) / (1 + a * a + b * b) ** 1.5; // texel solid angle
        samples.push({ d, c: radiance(d.x, d.y, d.z), w });
      }
    }
  }
  return samples;
}

function rgbm([r, g, b]: Rgb, out: Uint8Array, at: number): void {
  const max = Math.min(1, Math.max(r, g, b, 1e-6) / RANGE);
  const m = Math.ceil(max * 255) / 255;
  const scale = 1 / (m * RANGE);
  out[at] = Math.min(255, Math.round(r * scale * 255));
  out[at + 1] = Math.min(255, Math.round(g * scale * 255));
  out[at + 2] = Math.min(255, Math.round(b * scale * 255));
  out[at + 3] = Math.round(m * 255);
}

function build(): ArrayBuffer {
  const samples = sourceSamples();
  const sh = new SphericalHarmonics3();
  const color = new Color();
  for (const s of samples) sh.addLight(s.d, color.set(s.c[0], s.c[1], s.c[2], 1), s.w);
  const mips = Math.log2(SIZE) + 1;
  let bytes = 27 * 4 + 2;
  for (let m = 0; m < mips; m++) bytes += 6 * (SIZE >> m) ** 2 * 4;
  const buffer = new ArrayBuffer(bytes);
  const coefficients = new Float32Array(buffer, 0, 27);
  sh.copyToArray(coefficients);
  new Uint16Array(buffer, 27 * 4, 1)[0] = SIZE;
  const out = new Uint8Array(buffer);
  let offset = 27 * 4 + 2;
  const d = new Vector3();
  for (let m = 0; m < mips; m++) {
    const size = SIZE >> m;
    // Mip 0 is the sharp sky; each level after it is a wider lobe, as roughness grows.
    const power = m === 0 ? 0 : 2 ** (12 - 1.6 * m);
    for (let face = 0; face < 6; face++) {
      for (let j = 0; j < size; j++) {
        for (let i = 0; i < size; i++) {
          direction(face, (i + 0.5) / size, (j + 0.5) / size, d);
          let c: Rgb;
          if (power === 0) {
            c = radiance(d.x, d.y, d.z);
          } else {
            c = [0, 0, 0];
            let total = 0;
            for (const s of samples) {
              const cos = d.x * s.d.x + d.y * s.d.y + d.z * s.d.z;
              if (cos <= 0) continue;
              const w = cos ** power * s.w;
              c[0] += s.c[0] * w;
              c[1] += s.c[1] * w;
              c[2] += s.c[2] * w;
              total += w;
            }
            c = total > 0 ? [c[0] / total, c[1] / total, c[2] / total] : radiance(d.x, d.y, d.z);
          }
          rgbm(c, out, offset);
          offset += 4;
        }
      }
    }
  }
  return buffer;
}

let url: string | undefined;

/** A blob URL of the studio .env file, built once per page. */
export function studioEnvUrl(): string {
  url ??= URL.createObjectURL(new Blob([build()]));
  return url;
}

/** Loads the studio environment as `engine`'s ambient light, the way the docs load a baked one. */
export async function loadStudioEnv(engine: Engine): Promise<AmbientLight> {
  return engine.resourceManager.load<AmbientLight>({ type: AssetType.Env, url: studioEnvUrl() });
}
