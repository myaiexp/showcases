// tanstack-charts example: Gradient ids and idPrefix in static SVG
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Gradient ids and idPrefix in static SVG",
  summary:
    "The same gradient chart is serialized twice into one page. With distinct idPrefix values each string keeps its own gradient id and url(#...) paint. With a shared prefix, both strings carry the same id, the page holds duplicate ids, and the second chart paints with the first one's gradient.",
  section: "Rendering and Export",
  tags: ['renderChartSvg', 'gradients', 'idPrefix', 'defs'],
  docs: [
    'repo/docs/reference/rendering-and-export.md',
    'repo/docs/guides/exporting.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
