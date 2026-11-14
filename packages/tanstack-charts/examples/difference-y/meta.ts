// tanstack-charts example: Forecast against actual
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Forecast against actual',
  summary:
    'differenceY fills the gap between two lines: green where actual (y2) is above the forecast (y1), blue where it is below, with the lines meeting at the exact crossing so the lobes touch with no gap. Hover for either line\'s value.',
  section: 'Difference Marks',
  tags: ['differenceY', 'y1', 'y2', 'positiveFill', 'negativeFill', 'tooltip'],
  docs: ['repo/docs/reference/marks/difference.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
