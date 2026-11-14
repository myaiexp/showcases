// observable-plot example: Scales: diverging color scatterplot
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scales: diverging color scatterplot',
  summary:
    'Temperature anomalies as dots colored by a diverging BuRd scale; the pivot and the symmetric option control where the colors split.',
  section: 'Scales',
  tags: ['dot', 'diverging', 'pivot', 'symmetric', 'BuRd'],
  docs: ['repo/docs/features/scales.md', 'repo/docs/data/gistemp.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
