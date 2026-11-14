// deck-gl example: IconLayer mask and getColor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "IconLayer mask and getColor",
  summary:
    "An atlas whose icons have mask: true takes its colour from getColor; with mask false the image keeps its colours.",
  section: 'Core layers',
  tags: ["IconLayer","mask","getColor","iconMapping"],
  docs: ["repo/docs/api-reference/layers/icon-layer.md","repo/docs/api-reference/core/layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
