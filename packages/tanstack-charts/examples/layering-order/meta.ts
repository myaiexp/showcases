// tanstack-charts example: Layer order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Layer order',
  summary:
    'An opaque area, a line and dots in one chart. A select reverses the marks array so the area ends up on top of the others.',
  section: 'Marks and Layering',
  tags: ['areaY', 'lineY', 'dot', 'marks order'],
  docs: [
    'repo/docs/concepts/marks-and-layering.md',
    'repo/docs/reference/chart-spec.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
