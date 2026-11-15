// plotly-js example: Treemap with nested layers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Treemap with nested layers",
  summary: "The coffee flavour hierarchy as a treemap from a CSV of ids, labels and parents. Selects choose the tiling algorithm and a slider the maxdepth; the card cycles the packing.",
  section: "Treemaps",
  tags: ['treemap', 'ids', 'tiling.packing', 'maxdepth', 'pathbar'],
  docs: ['repo/_posts/plotly_js/basic/treemap/2019-10-15-nested-layers-treemap.html', 'repo/coffee-flavors.csv'],
  provenance: 'pure',
  added: '2026-11-15',
});
