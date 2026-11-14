// deck-gl example: HexagonLayer picking and CPU vs GPU
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "HexagonLayer picking and CPU vs GPU",
  summary:
    "Hover a hexagon for its count and values; pointIndices and points exist only with CPU aggregation.",
  section: 'Aggregation layers',
  tags: ["HexagonLayer","gpuAggregation","pickable","pointIndices","points","autoHighlight"],
  docs: ["repo/docs/api-reference/aggregation-layers/hexagon-layer.md","repo/docs/api-reference/aggregation-layers/overview.md","repo/docs/api-reference/core/layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
