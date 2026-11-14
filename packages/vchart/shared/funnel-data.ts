// Sample data for the Funnel examples: five conversion stages with a falling count
import { rng } from './components-data.ts';

export const STAGES = ['Impressions', 'Clicks', 'Sign-ups', 'Trials', 'Purchases'];
export const BASE = [1000, 640, 380, 190, 80];

export interface Stage {
  name: string;
  value: number;
}

export const funnelRows = (values: readonly number[] = BASE): Stage[] => STAGES.map((name, i) => ({ name, value: values[i] as number }));

/** A source of new funnels: each stage a bit smaller than the one before it, so the shape stays a funnel. */
export function funnelJitter(seed = 3): () => Stage[] {
  const r = rng(seed);
  return () => {
    let v = 800 + Math.round(r() * 400);
    return STAGES.map((name) => {
      const row = { name, value: v };
      v = Math.round(v * (0.45 + r() * 0.4));
      return row;
    });
  };
}
