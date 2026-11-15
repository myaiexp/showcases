// l7 example: Grid heat map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Grid heat map",
  summary:
    "Points from CSV text are summed into equal squares by a 'grid' transform; the squares draw in shape('square') and colour by their count.",
  section: "Tutorial: Heatmap",
  tags: ["HeatmapLayer","source","csv","transforms","grid","square","coverage","angle","color"],
  docs: ["repo/site/docs/tutorial/heatmap/grid.en.md","repo/site/docs/api/source/source.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
