// tanstack-charts example: Gradient resources
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Gradient resources',
  summary:
    'A linear gradient fill on an area and a radial gradient on dots, declared in the chart spec gradients and referenced as url(#id). idPrefix keeps the ids unique per chart.',
  section: 'Marks and Layering',
  tags: ['gradients', 'idPrefix', 'areaY'],
  docs: [
    'repo/docs/reference/chart-spec.md',
    'repo/docs/reference/marks/dot-and-hexagon.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
