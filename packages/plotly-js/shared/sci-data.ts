// Scientific chart data: soil classes, engine block, airfoil, contour grid
import { gaussianRand, rng } from './gl-data.ts';

/**
 * The docs load these from gists and a third-party datasets repo, which the vendored docs do
 * not include. Each one is rebuilt here in code, seeded, with the same shape.
 */

/** USDA soil texture classes as [clay, sand] corners; silt is what is left of 100. */
const soilCorners: Record<string, [number, number][]> = {
  Sand: [[0, 100], [10, 90], [0, 85]],
  'Loamy sand': [[0, 85], [10, 90], [15, 85], [0, 70]],
  'Sandy loam': [[0, 70], [15, 85], [20, 80], [20, 52], [7, 52], [7, 43], [0, 50]],
  'Sandy clay loam': [[20, 80], [35, 65], [35, 45], [27, 45], [20, 52]],
  'Sandy clay': [[35, 65], [55, 45], [35, 45]],
  Loam: [[7, 52], [20, 52], [27, 45], [27, 23], [7, 43]],
  'Clay loam': [[27, 45], [40, 45], [40, 20], [27, 20]],
  Clay: [[55, 45], [40, 45], [40, 20], [60, 0], [100, 0]],
  'Silty clay loam': [[27, 20], [40, 20], [40, 0], [27, 0]],
  'Silty clay': [[40, 20], [40, 0], [60, 0]],
  'Silt loam': [[0, 50], [7, 43], [27, 23], [27, 0], [12, 0], [12, 8], [0, 20]],
  Silt: [[0, 0], [12, 0], [12, 8], [0, 20]],
};

export interface SoilClass {
  name: string;
  clay: number[];
  sand: number[];
  silt: number[];
}

/** The twelve soil classes as closed outlines in ternary coordinates (the docs' data.json shape). */
export function soilClasses(): SoilClass[] {
  return Object.entries(soilCorners).map(([name, pts]) => ({
    name,
    clay: pts.map(([c]) => c),
    sand: pts.map(([, s]) => s),
    silt: pts.map(([c, s]) => 100 - c - s),
  }));
}

/** 220 engine-block design rows: ten correlated columns plus the colour value. */
export function engineBlock(): Record<string, number[]> {
  const rand = rng(11);
  const cols: Record<string, number[]> = {};
  const keys = ['blockHeight', 'blockWidth', 'cycMaterial', 'blockMaterial', 'totalWeight', 'assemblyPW', 'HstW', 'minHW', 'minWD', 'rfBlock', 'colorVal'];
  for (const k of keys) cols[k] = [];
  const mats = [0, 0.5, 1, 2, 3];
  for (let i = 0; i < 220; i += 1) {
    const h = 32000 + rand() * 195000;
    const w = 40000 + rand() * 640000;
    const cm = mats[Math.floor(rand() * mats.length)] ?? 0;
    const bm = Math.floor(rand() * 4);
    const weight = 134 + (h / 227900) * 1400 + (w / 700000) * 1100 + bm * 90 + gaussianRand(rand) * 300;
    const push = (k: string, v: number): void => void cols[k]?.push(Math.round(v));
    push('blockHeight', h);
    push('blockWidth', w);
    push('cycMaterial', cm * 1000);
    push('blockMaterial', bm * 1000);
    push('totalWeight', Math.min(3154, Math.max(134, weight)));
    push('assemblyPW', Math.max(9, 19984 * rand() * (w / 700000)));
    push('HstW', 49000 + (h / 227900) * 300000 + (w / 700000) * 200000 + gaussianRand(rand) * 60000);
    push('minHW', -28000 + (h / 227900) * 150000 + gaussianRand(rand) * 60000);
    push('minWD', 98453 + (w / 700000) * 300000 + gaussianRand(rand) * 60000);
    push('rfBlock', 1417 + (1 - h / 227900) * 80000 * rand() + (w / 700000) * 20000);
    push('colorVal', -4000 + (weight / 3154) * 3900 + gaussianRand(rand) * 400);
  }
  // the docs' cylinder/block material ticks sit at 0..3: scale the codes back
  cols.cycMaterial = (cols.cycMaterial ?? []).map((v) => v / 1000);
  cols.blockMaterial = (cols.blockMaterial ?? []).map((v) => v / 1000);
  return cols;
}

export interface Airfoil {
  a: number[];
  b: number[];
  x: number[][];
  y: number[][];
  /** Pressure coefficient and stream function on the same grid (rows follow b, columns a). */
  cp: number[][];
  psi: number[][];
  /** The wing's outline. */
  outline: { x: number[]; y: number[] };
}

/**
 * Potential flow past a Joukowski airfoil: a circle in the zeta plane carries flow with the
 * Kutta condition, and z = zeta + 1/zeta maps it to a wing. Stands in for the docs' Karman-Trefftz
 * file: the grid follows the wing (a around it, b outward), which is what a carpet is for.
 */
export function airfoil(alphaDeg = 6): Airfoil {
  const cx = -0.1;
  const cy = 0.08;
  const R = Math.hypot(1 - cx, cy);
  const alpha = (alphaDeg * Math.PI) / 180;
  const cexp = (t: number): [number, number] => [Math.cos(t), Math.sin(t)];
  const mul = ([p, q]: [number, number], [r, s]: [number, number]): [number, number] => [p * r - q * s, p * s + q * r];
  const div = ([p, q]: [number, number], [r, s]: [number, number]): [number, number] => {
    const d = r * r + s * s;
    return [(p * r + q * s) / d, (q * r - p * s) / d];
  };
  // Circulation from dw/dzeta = 0 at the trailing edge zeta = 1.
  const z1: [number, number] = [1 - cx, -cy];
  const e1 = mul(cexp(-alpha), z1);
  const e2 = div(mul([R * R, 0], cexp(alpha)), z1);
  const gamma = 2 * Math.PI * (-(e1[1] - e2[1]));

  const a: number[] = [];
  const b: number[] = [];
  for (let i = 0; i <= 120; i += 1) a.push(i * 3);
  for (let j = 0; j < 46; j += 1) b.push(1.01 + (j / 45) ** 1.6 * 3);
  const x: number[][] = [];
  const y: number[][] = [];
  const cp: number[][] = [];
  const psi: number[][] = [];
  for (const s of b) {
    const rx: number[] = [];
    const ry: number[] = [];
    const rc: number[] = [];
    const rp: number[] = [];
    for (const deg of a) {
      const t = (deg * Math.PI) / 180;
      const zp: [number, number] = [R * s * Math.cos(t), R * s * Math.sin(t)];
      const zeta: [number, number] = [cx + zp[0], cy + zp[1]];
      const inv = div([1, 0], zeta);
      rx.push(zeta[0] + inv[0]);
      ry.push(zeta[1] + inv[1]);
      // dw/dzeta = e^-ia - R^2 e^ia / z'^2 + i gamma / (2 pi z')
      const t1 = cexp(-alpha);
      const t2 = div(mul([R * R, 0], cexp(alpha)), mul(zp, zp));
      const t3 = div([0, gamma / (2 * Math.PI)], zp);
      const dw: [number, number] = [t1[0] - t2[0] + t3[0], t1[1] - t2[1] + t3[1]];
      const jac = div([1, 0], mul(zeta, zeta));
      const v = div(dw, [1 - jac[0], -jac[1]]);
      rc.push(Math.max(-8, Math.min(1.2, 1 - (v[0] * v[0] + v[1] * v[1]))));
      // stream function: Im(zp e^-ia + R^2 e^ia / zp) + gamma/(2 pi) ln|zp|
      const w1 = mul(zp, cexp(-alpha));
      const w2 = div(mul([R * R, 0], cexp(alpha)), zp);
      rp.push(w1[1] + w2[1] + (gamma / (2 * Math.PI)) * Math.log(Math.hypot(zp[0], zp[1])));
    }
    x.push(rx);
    y.push(ry);
    cp.push(rc);
    psi.push(rp);
  }
  const first = (rows: number[][]): number[] => rows[0] ?? [];
  return { a, b, x, y, cp, psi, outline: { x: first(x), y: first(y) } };
}

/** The 5x5 grid the contour pages share. */
export const basicZ: number[][] = [
  [10, 10.625, 12.5, 15.625, 20],
  [5.625, 6.25, 8.125, 11.25, 15.625],
  [2.5, 3.125, 5, 8.125, 12.5],
  [0.625, 1.25, 3.125, 6.25, 10.625],
  [0, 0.625, 2.5, 5.625, 10],
];

/** n evenly spaced numbers from a to b, both included. */
export const linspace = (a: number, b: number, n: number): number[] => Array.from({ length: n }, (_, i) => a + ((b - a) * i) / (n - 1));
