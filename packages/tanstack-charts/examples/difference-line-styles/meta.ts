// tanstack-charts example: Styling the two boundary lines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Styling the two boundary lines',
  summary:
    'The primary line (y2) and the comparison line (y1) are styled separately: stroke, strokeWidth and strokeDasharray for the primary, comparisonStroke, comparisonStrokeWidth and comparisonStrokeDasharray for the other, plus points on both lines.',
  section: 'Difference Marks',
  tags: ['differenceY', 'stroke', 'comparisonStroke', 'comparisonStrokeDasharray', 'points', 'positiveFillOpacity'],
  docs: ['repo/docs/reference/marks/difference.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
