// deck-gl example: S2Layer cell hierarchy
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "S2Layer cell hierarchy",
  summary:
    "Three S2Layers stacked, one per level: every cell holds four children, whose keys extend the parent's by one digit.",
  section: 'Geo layers',
  tags: ["S2Layer","getS2Token","filled","stroked","getLineWidth"],
  docs: ["repo/docs/api-reference/geo-layers/s2-layer.md","repo/docs/api-reference/layers/polygon-layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
