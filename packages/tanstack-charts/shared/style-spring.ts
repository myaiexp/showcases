// Samples createChartSpring into chart rows: value over time, and the time it comes to rest
import { createChartSpring } from '@tanstack/charts/spring';
import type { ChartSpringOptions } from '@tanstack/charts/spring';

export interface SpringRow {
  id: string;
  label: string;
  ms: number;
  value: number;
}

/** Samples a spring moving from 0 to 100 every `stepMs` up to `totalMs`; `doneAt` is the first resting sample. */
export function sampleSpring(label: string, options: ChartSpringOptions, totalMs = 2000, stepMs = 20): { rows: SpringRow[]; doneAt: number | null } {
  const spring = createChartSpring(options);
  const rows: SpringRow[] = [];
  let doneAt: number | null = null;
  for (let ms = 0; ms <= totalMs; ms += stepMs) {
    const s = spring.sample(ms, { from: 0, to: 100, velocity: 0 });
    rows.push({ id: `${label}-${ms}`, label, ms, value: s.value });
    if (doneAt === null && s.done) doneAt = ms;
  }
  return { rows, doneAt };
}
