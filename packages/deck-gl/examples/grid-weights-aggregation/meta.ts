// deck-gl example: GridLayer weights and aggregation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "GridLayer weights and aggregation",
  summary:
    "Colour and height from weighted points, reduced by SUM, MEAN, MIN, MAX or COUNT.",
  section: 'Aggregation layers',
  tags: ["GridLayer","getColorWeight","colorAggregation","getElevationWeight","elevationAggregation"],
  docs: ["repo/docs/api-reference/aggregation-layers/grid-layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
