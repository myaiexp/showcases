// deck-gl example: HexagonLayer weights and aggregation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "HexagonLayer weights and aggregation",
  summary:
    "Weighted points reduced by SUM, MEAN, MIN, MAX or COUNT, chosen separately for colour and height.",
  section: 'Aggregation layers',
  tags: ["HexagonLayer","getColorWeight","colorAggregation","getElevationWeight","elevationAggregation"],
  docs: ["repo/docs/api-reference/aggregation-layers/hexagon-layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
