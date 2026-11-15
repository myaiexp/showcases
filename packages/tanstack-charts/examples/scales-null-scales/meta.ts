// tanstack-charts example: Null scale entries
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Null scale entries',
  summary:
    'Marks with no x dimension use scales x: null. One chart has only ruleY thresholds and a y axis; the other is a bare frame with both scales null.',
  section: 'Scales',
  tags: ['ruleY', 'frame', 'scales null'],
  docs: ['repo/docs/concepts/scales-and-d3.md', 'repo/docs/reference/chart-spec.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
