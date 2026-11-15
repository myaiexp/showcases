// tanstack-charts example: A renderer that paints scene nodes as HTML
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A renderer that paints scene nodes as HTML",
  summary:
    "A hand-written ChartRenderer paints the compiled scene as absolutely positioned divs and spans instead of SVG or canvas, and is mounted with mountChartRenderer. It supplies prerender, mount, render, clientToScene and paintFocus, while the shared host still provides sizing, hover focus and the tooltip.",
  section: "Custom Marks and Renderers",
  tags: ['ChartRenderer', 'ChartSurface', 'mountChartRenderer', 'clientToScene', 'paintFocus', 'prerender'],
  docs: [
    'repo/docs/guides/custom-marks-and-renderers.md',
    'repo/docs/reference/rendering-and-export.md',
    'repo/docs/reference/marks/bar-and-rect.md',
    'repo/docs/reference/scales-guides-and-color.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
