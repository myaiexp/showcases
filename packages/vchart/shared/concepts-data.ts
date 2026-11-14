// Small seeded datasets shared by the Basic and Concepts examples
export interface Datum {
  [key: string]: string | number | boolean | null | undefined;
}

/** A tiny seeded generator (mulberry32), so every run draws the same first frame. */
export function seeded(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const YEARS = ['1930', '1940', '1950', '1960', '1970', '1980', '1990', '2000', '2010', '2018'];

/** The grouped-bar data of A_Basic_Spec.md: two types over ten years. */
export const yearGroups: Datum[] = [
  ...[129, 133, 130, 126, 117, 114, 111, 89, 80, 80].map((value, i) => ({ type: 'A', year: YEARS[i], value })),
  ...[22, 13, 25, 29, 38, 41, 57, 87, 98, 99].map((value, i) => ({ type: 'B', year: YEARS[i], value })),
];

/** Same shape as yearGroups with fresh values, for updateData loops. */
export function jitterYearGroups(rand: () => number): Datum[] {
  return yearGroups.map((d) => ({ ...d, value: Math.max(5, Math.round(Number(d.value) * (0.7 + rand() * 0.6))) }));
}

export const WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

/** Flattened class scores: one row per day and class (Data_Types_and_Interface.md). */
export function classScores(rand: () => number, days: readonly string[] = WEEK): Datum[] {
  return days.flatMap((date) =>
    ['class No.1', 'class No.2'].map((cls) => ({ date, class: cls, score: Math.round(15 + rand() * 20) })),
  );
}

/** Stacked series values per category, for stack/percent/label examples. */
export function stackedValues(rand: () => number, cats = ['A', 'B', 'C', 'D', 'E', 'F'], groups = ['g1', 'g2', 'g3', 'g4']): Datum[] {
  return groups.flatMap((group) => cats.map((name) => ({ name, group, value: Math.round(10 + rand() * 40) / 100 })));
}

/** A walk of n points between lo and hi, labelled with an index or a label list. */
export function walk(rand: () => number, n: number, lo = 10, hi = 90): number[] {
  const out: number[] = [];
  let v = (lo + hi) / 2;
  for (let i = 0; i < n; i++) {
    v = Math.min(hi, Math.max(lo, v + (rand() - 0.5) * (hi - lo) * 0.35));
    out.push(Math.round(v * 10) / 10);
  }
  return out;
}
