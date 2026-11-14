// Frame data for the Player examples: one data entry per time step
import { rng } from './components-data.ts';

export interface BarFrame {
  year: string;
  name: string;
  value: number;
}

export const BROWSERS = ['Chrome', 'Safari', 'Edge', 'Firefox', 'Opera'];
export const YEARS = ['2018', '2019', '2020', '2021', '2022', '2023', '2024'];

/** One array of rows per year, each browser's share drifting from the year before. */
export function barFrames(seed = 5): BarFrame[][] {
  const r = rng(seed);
  const level = BROWSERS.map((_, i) => 60 - i * 11);
  return YEARS.map((year) =>
    BROWSERS.map((name, i) => {
      level[i] = Math.max(8, Math.min(95, (level[i] ?? 30) + (r() - 0.45) * 16));
      return { year, name, value: Math.round(level[i] ?? 0) };
    }),
  );
}

export interface DotFrame {
  year: string;
  country: string;
  income: number;
  life: number;
  pop: number;
}

export const COUNTRIES = ['Alba', 'Brenn', 'Carro', 'Dunmar', 'Estra', 'Fenwick'];

/** Scatter frames: income and life expectancy drift upward, with a population for the size. */
export function dotFrames(seed = 9): DotFrame[][] {
  const r = rng(seed);
  const state = COUNTRIES.map(() => ({ income: 10 + r() * 40, life: 50 + r() * 15, pop: 10 + r() * 70 }));
  return YEARS.map((year) =>
    COUNTRIES.map((country, i) => {
      const s = state[i] as { income: number; life: number; pop: number };
      s.income += 4 + r() * 8;
      s.life += 0.5 + r() * 2;
      s.pop += r() * 6;
      return { year, country, income: Math.round(s.income), life: Math.round(s.life * 10) / 10, pop: Math.round(s.pop) };
    }),
  );
}
