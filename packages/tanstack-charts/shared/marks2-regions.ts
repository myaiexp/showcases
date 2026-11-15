// Monthly values for four regions at different levels
import { normal, rng, walk } from './random.ts';

export interface RegionRow {
  id: string;
  region: string;
  month: number;
  value: number;
}

const levels: Record<string, number> = { North: 30, South: 55, East: 12, West: 80 };

export const regionRows: readonly RegionRow[] = (() => {
  const random = rng(44);
  normal(random);
  return Object.entries(levels).flatMap(([region, level]) =>
    walk(random, 12, level, level / 10).map((value, month) => ({ id: `${region}${month}`, region, month, value: Math.round(value * 10) / 10 })),
  );
})();
