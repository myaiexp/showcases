// observable-plot example: Curves: auto follows great circles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Curves: auto follows great circles',
  summary:
    'Under a projection, the auto curve interpolates along geodesics, so a flight route bends on the map; linear draws straight segments in the projected plane.',
  section: 'Curves',
  tags: ['line', 'curve', 'auto', 'projection', 'geo', 'sphere'],
  docs: ['repo/docs/features/curves.md', 'repo/docs/features/projections.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
