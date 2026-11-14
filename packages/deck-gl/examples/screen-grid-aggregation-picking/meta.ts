// deck-gl example: ScreenGridLayer aggregation and picking
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ScreenGridLayer aggregation and picking",
  summary:
    "Choose SUM, MEAN, MIN, MAX or COUNT, toggle gpuAggregation and hover a cell.",
  section: 'Aggregation layers',
  tags: ["ScreenGridLayer","aggregation","gpuAggregation","pickable","getWeight"],
  docs: ["repo/docs/api-reference/aggregation-layers/screen-grid-layer.md","repo/docs/api-reference/aggregation-layers/overview.md","repo/docs/api-reference/core/layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
