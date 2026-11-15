// l7 example: Hexagon heat map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Hexagon heat map",
  summary:
    "The tutorial's honeycomb: a 'hexagon' transform sums v per cell, hexagonColumn draws each cell, size('sum', callback) sets the height and the sum picks the colour.",
  section: "Tutorial: Heatmap",
  tags: ["HeatmapLayer","transforms","hexagon","hexagonColumn","size","callback","coverage","color"],
  docs: ["repo/site/docs/tutorial/heatmap/hexagon.en.md","repo/site/docs/api/source/source.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
