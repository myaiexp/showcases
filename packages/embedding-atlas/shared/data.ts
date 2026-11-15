// Seeded sample embeddings: 2D topic clusters, a category and a text per point
//
// Real embeddings come from a model; these stand in for its 2D projection. Each topic is a
// blob (or a ring, or a curve) in the plane, and every point gets a sentence built from its
// topic's words, so text-based cluster labels have something to find.

/** Mulberry32: a small seeded generator, so every mount draws the same points. */
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

/** A standard normal sample (Box–Muller). */
export function gauss(r: () => number): number {
  return Math.sqrt(-2 * Math.log(1 - r())) * Math.cos(2 * Math.PI * r());
}

export interface Topic {
  name: string;
  words: readonly string[];
}

export const TOPICS: readonly Topic[] = [
  { name: 'astronomy', words: ['comet', 'telescope', 'nebula', 'orbit', 'galaxy', 'eclipse', 'planet', 'meteor', 'pulsar', 'quasar', 'crater', 'redshift'] },
  { name: 'cooking', words: ['sourdough', 'simmer', 'garlic', 'saffron', 'braise', 'skillet', 'risotto', 'basil', 'marinade', 'dumpling', 'broth', 'pastry'] },
  { name: 'sailing', words: ['harbor', 'mainsail', 'regatta', 'anchor', 'tiller', 'starboard', 'keel', 'mooring', 'spinnaker', 'buoy', 'tack', 'jib'] },
  { name: 'music', words: ['cello', 'chord', 'tempo', 'sonata', 'melody', 'rhythm', 'violin', 'octave', 'chorus', 'piano', 'scale', 'fugue'] },
  { name: 'gardening', words: ['compost', 'tulip', 'seedling', 'trellis', 'mulch', 'pruning', 'orchard', 'fern', 'greenhouse', 'bulb', 'hedge', 'soil'] },
  { name: 'chess', words: ['bishop', 'gambit', 'castling', 'checkmate', 'rook', 'endgame', 'pawn', 'opening', 'knight', 'stalemate', 'queen', 'tempo'] },
  { name: 'weather', words: ['drizzle', 'cyclone', 'humidity', 'thunder', 'forecast', 'frost', 'monsoon', 'breeze', 'hail', 'barometer', 'fog', 'gust'] },
  { name: 'railways', words: ['locomotive', 'platform', 'signal', 'timetable', 'sleeper', 'carriage', 'junction', 'freight', 'tunnel', 'conductor', 'viaduct', 'depot'] },
];

const FILLER = ['the', 'a', 'about', 'with', 'and', 'for', 'over', 'into', 'notes', 'story', 'guide', 'review'];

/** A short line of text for one topic: mostly its own words, a little filler. */
export function sentence(r: () => number, topic: Topic, length = 7): string {
  const out: string[] = [];
  for (let i = 0; i < length; i++) {
    const pool = r() < 0.75 ? topic.words : FILLER;
    out.push(pool[Math.floor(r() * pool.length)]!);
  }
  return out.join(' ');
}

/** Where each topic sits: round an ellipse wider than tall (views are wide), with jitter. */
function centres(k: number, r: () => number, radius: number): [number, number][] {
  return Array.from({ length: k }, (_, i) => {
    const a = (i / k) * Math.PI * 2 + r() * 0.4;
    const d = radius * (0.6 + r() * 0.5);
    return [Math.cos(a) * d, Math.sin(a) * d * 0.6];
  });
}

export interface Points {
  count: number;
  x: Float32Array<ArrayBuffer>;
  y: Float32Array<ArrayBuffer>;
  /** Topic index of each point, 0-based. */
  category: Uint8Array<ArrayBuffer>;
  /** Topic names, indexed by category. */
  names: string[];
  /** Topic centres in data units. */
  centres: [number, number][];
  /** Builds the text for point `i` on demand (cheap to keep for millions of points). */
  text(i: number): string;
}

export interface PointsOptions {
  count?: number;
  /** How many topics (≤ 8). Default 6. */
  topics?: number;
  seed?: number;
  /** Spread of each blob relative to the layout radius. Default 1. */
  spread?: number;
  /** Fraction of points scattered uniformly as background noise. Default 0.03. */
  noise?: number;
}

/** Gaussian blobs, one per topic, of uneven sizes. */
export function topicPoints(opts: PointsOptions = {}): Points {
  const count = opts.count ?? 20000;
  const k = Math.min(opts.topics ?? 6, TOPICS.length);
  const seed = opts.seed ?? 7;
  const r = rng(seed);
  const cs = centres(k, r, 6);
  const weights = Array.from({ length: k }, () => 0.5 + r());
  const total = weights.reduce((s, w) => s + w, 0);
  const sx = cs.map(() => (0.6 + r() * 0.9) * (opts.spread ?? 1));
  const sy = cs.map(() => (0.6 + r() * 0.9) * (opts.spread ?? 1));
  const x = new Float32Array(count);
  const y = new Float32Array(count);
  const category = new Uint8Array(count);
  const noise = opts.noise ?? 0.03;
  for (let i = 0; i < count; i++) {
    let pick = r() * total;
    let c = 0;
    while (c < k - 1 && (pick -= weights[c]!) > 0) c++;
    category[i] = c;
    if (r() < noise) {
      x[i] = (r() - 0.5) * 18;
      y[i] = (r() - 0.5) * 18;
    } else {
      x[i] = cs[c]![0] + gauss(r) * sx[c]!;
      y[i] = cs[c]![1] + gauss(r) * sy[c]!;
    }
  }
  const names = TOPICS.slice(0, k).map((t) => t.name);
  return {
    count,
    x,
    y,
    category,
    names,
    centres: cs,
    text: (i) => sentence(rng(seed * 100003 + i), TOPICS[category[i]!]!),
  };
}

/** Every point's text, for a Mosaic table's text column. */
export function texts(p: Points): string[] {
  return Array.from({ length: p.count }, (_, i) => p.text(i));
}
