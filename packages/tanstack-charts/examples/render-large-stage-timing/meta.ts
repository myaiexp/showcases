// tanstack-charts example: Timing each stage separately
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Timing each stage separately",
  summary:
    "A run builds one density grid from a chosen number of rows and times each stage on its own: creating the source, preparing the grid, compiling the scene without mounting, and serializing it to SVG. The bars show milliseconds per stage, with a correctness gate that the grid still accounts for every row.",
  section: "Large Data",
  tags: ['createChartScene', 'renderChartSvg', 'performance.now', 'barX'],
  docs: ['repo/docs/guides/large-data.md', 'repo/docs/guides/bundle-size-and-performance.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
