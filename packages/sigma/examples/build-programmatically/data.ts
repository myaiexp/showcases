// Seeded random helpers for growing the programmatically built graph
const COLORS = ['#e22653', '#277da1', '#43aa8b', '#f9a03f', '#9b5de5'];
const NAMES = ['Alice', 'Bob', 'Carol', 'Dave', 'Erin', 'Frank', 'Grace', 'Heidi', 'Ivan', 'Judy', 'Mallory', 'Niaj'];

// mulberry32: seeded PRNG so a given run of clicks is repeatable
export function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function pick<T>(rand: () => number, items: readonly T[]): T {
  return items[Math.floor(rand() * items.length)] as T;
}

export function randomNodeAttributes(rand: () => number, index: number) {
  const name = NAMES[index % NAMES.length] ?? 'Node';
  return {
    label: index < NAMES.length ? name : `${name} ${Math.floor(index / NAMES.length) + 1}`,
    x: rand() * 100,
    y: rand() * 100,
    size: 6 + rand() * 8,
    color: pick(rand, COLORS),
  };
}
