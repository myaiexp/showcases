// observable-plot example: Scales: log scale ticks and base
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scales: log scale ticks and base',
  summary:
    'A log x scale with SI-prefixed ticks, a plain tickFormat, and base 2 with 20 ticks; base changes only where ticks are drawn.',
  section: 'Scales',
  tags: ['log', 'base', 'ticks', 'tickFormat'],
  docs: ['repo/docs/features/scales.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
