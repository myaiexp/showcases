// deck-gl example: HexagonLayer custom value functions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "HexagonLayer custom value functions",
  summary:
    "getColorValue and getElevationValue reduce each hexagon's points with your own function (CPU).",
  section: 'Aggregation layers',
  tags: ["HexagonLayer","getColorValue","getElevationValue","gpuAggregation","updateTriggers"],
  docs: ["repo/docs/api-reference/aggregation-layers/hexagon-layer.md","repo/docs/api-reference/core/layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
