// tanstack-charts example: A custom mark that selects Canvas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A custom mark that selects Canvas",
  summary:
    "A custom mark that paints 1,500 dots passes canvasChartRenderer as createMark's third argument, so those nodes paint on a canvas layer while the axes stay SVG. The checkbox drops the renderer to compare the node counts the readout reports in the DOM.",
  section: "Custom Marks and Renderers",
  tags: ['createMark', 'canvasChartRenderer', 'renderer', 'mark-level renderer'],
  docs: ['repo/docs/guides/custom-marks-and-renderers.md', 'repo/docs/reference/custom-extensions.md', 'repo/docs/reference/rendering-and-export.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
