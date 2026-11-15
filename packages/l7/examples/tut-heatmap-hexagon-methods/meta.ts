// l7 example: Hexagon aggregation methods
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Hexagon aggregation methods",
  summary:
    "A transform's method decides what each cell holds: count, max, min, sum or mean of the field. Each result is stored under the method's name, and the layer colours that field.",
  section: "Tutorial: Heatmap",
  tags: ["HeatmapLayer","transforms","hexagon","method","count","max","min","sum","mean"],
  docs: ["repo/site/docs/tutorial/heatmap/hexagon.en.md","repo/site/docs/api/source/source.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
