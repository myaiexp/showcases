// tanstack-charts example: renderChartSvg from a compiled scene
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "renderChartSvg from a compiled scene",
  summary:
    "A definition is compiled with createChartScene at a fixed size, serialized with renderChartSvg, and the string is inserted into the page. Nothing is mounted: no observers, no tooltip, no focus. The same string could come from a server, and the panel shows its start.",
  section: "Rendering and Export",
  tags: ['createChartScene', 'renderChartSvg', 'SVG string'],
  docs: [
    'repo/docs/reference/rendering-and-export.md',
    'repo/docs/guides/exporting.md',
    'repo/docs/reference/marks/bar-and-rect.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
