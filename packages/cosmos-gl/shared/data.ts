// Seeded sample graphs as cosmos.gl arrays, centred where gravity pulls
/** Where gravity pulls at the default spaceSize (4096): every layout here is centred on it. */
export const CENTER = 2048;

/** Seeded random numbers in [0, 1), so a card looks the same on every visit. */
export function rng(seed = 1): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface GraphData {
  /** Number of points. */
  count: number;
  /** [x1, y1, x2, y2, …] */
  positions: Float32Array;
  /** [source1, target1, source2, target2, …] */
  links: Float32Array;
  /** Group of each point (cluster, tree depth, ring…), when the generator has one. */
  group: number[];
}

/** `count` points scattered in a disc of `radius` around CENTER. */
export function scatter(count: number, radius = 200, seed = 1): Float32Array {
  const r = rng(seed);
  const out = new Float32Array(count * 2);
  for (let i = 0; i < count; i++) {
    const a = r() * Math.PI * 2;
    const d = Math.sqrt(r()) * radius;
    out[i * 2] = CENTER + Math.cos(a) * d;
    out[i * 2 + 1] = CENTER + Math.sin(a) * d;
  }
  return out;
}

/** A random tree: each new point links to an earlier one. group = depth from the root. */
export function tree(count: number, seed = 1, spread = 200): GraphData {
  const r = rng(seed);
  const links: number[] = [];
  const group = [0];
  for (let i = 1; i < count; i++) {
    // Lean toward recent points so the tree grows long branches, not one star.
    const parent = Math.floor(i - 1 - Math.floor(r() * r() * i));
    links.push(parent, i);
    group.push((group[parent] ?? 0) + 1);
  }
  return { count, positions: scatter(count, spread, seed + 7), links: new Float32Array(links), group };
}

/** A cols × rows grid where each point links to its right and lower neighbour. */
export function mesh(cols: number, rows: number, gap = 10): GraphData {
  const count = cols * rows;
  const positions = new Float32Array(count * 2);
  const links: number[] = [];
  const group: number[] = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const i = y * cols + x;
      positions[i * 2] = CENTER + (x - (cols - 1) / 2) * gap;
      positions[i * 2 + 1] = CENTER + (y - (rows - 1) / 2) * gap;
      group.push(y);
      if (x + 1 < cols) links.push(i, i + 1);
      if (y + 1 < rows) links.push(i, i + cols);
    }
  }
  return { count, positions, links: new Float32Array(links), group };
}

/**
 * `groups` communities of `size` points: dense links inside each, a few between them.
 * group = community index.
 */
export function communities(groups: number, size: number, seed = 1, inside = 2, between = 0.02): GraphData {
  const r = rng(seed);
  const count = groups * size;
  const group: number[] = [];
  const links: number[] = [];
  for (let i = 0; i < count; i++) group.push(Math.floor(i / size));
  for (let i = 0; i < count; i++) {
    const g = group[i] ?? 0;
    for (let k = 0; k < inside; k++) {
      const j = g * size + Math.floor(r() * size);
      if (j !== i) links.push(i, j);
    }
    if (r() < between * groups) {
      const j = Math.floor(r() * count);
      if (group[j] !== g) links.push(i, j);
    }
  }
  return { count, positions: scatter(count, 260, seed + 3), links: new Float32Array(links), group };
}

/** `hubs` stars: each hub with `leaves` leaves, hubs joined in a ring. group = hub index. */
export function stars(hubs: number, leaves: number, seed = 1): GraphData {
  const count = hubs * (leaves + 1);
  const links: number[] = [];
  const group: number[] = [];
  for (let h = 0; h < hubs; h++) {
    const hub = h * (leaves + 1);
    group.push(h);
    for (let l = 1; l <= leaves; l++) {
      links.push(hub, hub + l);
      group.push(h);
    }
    links.push(hub, ((h + 1) % hubs) * (leaves + 1));
  }
  return { count, positions: scatter(count, 220, seed), links: new Float32Array(links), group };
}

/** `count` points on a circle of `radius`, each linked to the next. group = 0. */
export function ring(count: number, radius = 150): GraphData {
  const positions = new Float32Array(count * 2);
  const links: number[] = [];
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2;
    positions[i * 2] = CENTER + Math.cos(a) * radius;
    positions[i * 2 + 1] = CENTER + Math.sin(a) * radius;
    links.push(i, (i + 1) % count);
  }
  return { count, positions, links: new Float32Array(links), group: new Array<number>(count).fill(0) };
}

/** `count` random links among `points` points, no self links. */
export function randomLinks(points: number, count: number, seed = 1): Float32Array {
  const r = rng(seed);
  const out = new Float32Array(count * 2);
  for (let i = 0; i < count; i++) {
    const a = Math.floor(r() * points);
    let b = Math.floor(r() * (points - 1));
    if (b >= a) b++;
    out[i * 2] = a;
    out[i * 2 + 1] = b;
  }
  return out;
}

/** Fills a Float32Array with one value per item from `fn`. */
export function perItem(count: number, fn: (i: number) => number): Float32Array {
  const out = new Float32Array(count);
  for (let i = 0; i < count; i++) out[i] = fn(i);
  return out;
}
