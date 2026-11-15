// tanstack-charts example: Confidence level
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Confidence level',
  summary:
    'The ci option sets the confidence level of the fitted-mean band, from 0 (no band) up to just under 1. Slide it to watch the band widen as the level rises; at 0 only the line remains.',
  section: 'Linear Regression Marks',
  tags: ['linearRegressionY', 'ci'],
  docs: [
    'repo/docs/reference/marks/regression.md',
    'repo/docs/reference/marks/dot-and-hexagon.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
