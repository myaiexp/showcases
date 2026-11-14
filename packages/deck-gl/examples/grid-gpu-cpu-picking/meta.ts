// deck-gl example: GridLayer picking and CPU vs GPU
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "GridLayer picking and CPU vs GPU",
  summary:
    "Hover a cell for its count and values; pointIndices and points exist only with CPU aggregation.",
  section: 'Aggregation layers',
  tags: ["GridLayer","gpuAggregation","pickable","pointIndices","points","autoHighlight"],
  docs: ["repo/docs/api-reference/aggregation-layers/grid-layer.md","repo/docs/api-reference/aggregation-layers/overview.md","repo/docs/api-reference/core/layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
