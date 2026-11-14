// observable-plot example: Legends: threshold swatches or ramp
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Legends: threshold swatches or ramp',
  summary:
    'A threshold color scale gets a ramp legend by default; legend: "swatches" asks for one swatch per bin instead, and the full view switches between the two.',
  section: 'Legends',
  tags: ['legend', 'color', 'threshold', 'swatches', 'ramp'],
  docs: ['repo/docs/features/legends.md', 'repo/docs/data/gistemp.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
