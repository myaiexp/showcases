// deck-gl example: GreatCircleLayer basics
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "GreatCircleLayer basics",
  summary:
    "Arcs that follow the shortest path over the globe, so long routes bend toward the poles instead of cutting straight across the map.",
  section: 'Geo layers',
  tags: ["GreatCircleLayer","getSourcePosition","getTargetPosition","getSourceColor","getTargetColor"],
  docs: ["repo/docs/api-reference/geo-layers/great-circle-layer.md","repo/docs/api-reference/layers/arc-layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
