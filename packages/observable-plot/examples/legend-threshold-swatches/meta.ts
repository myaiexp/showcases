// observable-plot example: Legends: threshold swatches or ramp
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Legends: threshold swatches or ramp',
  summary:
    'A threshold color scale defaults to swatches for its bins; legend: "ramp" draws a gradient instead.',
  section: 'Legends',
  tags: ['legend', 'color', 'threshold', 'swatches', 'ramp'],
  docs: ['repo/docs/features/legends.md', 'repo/docs/data/gistemp.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
