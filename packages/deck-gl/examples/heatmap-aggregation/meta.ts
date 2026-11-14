// deck-gl example: HeatmapLayer aggregation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "HeatmapLayer aggregation",
  summary:
    "SUM adds the weights under each pixel, MEAN averages them; radiusPixels spreads each point.",
  section: 'Aggregation layers',
  tags: ["HeatmapLayer","aggregation","radiusPixels","getWeight"],
  docs: ["repo/docs/api-reference/aggregation-layers/heatmap-layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
