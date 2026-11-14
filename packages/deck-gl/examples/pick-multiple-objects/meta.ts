// deck-gl example: pickMultipleObjects deep picking
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "pickMultipleObjects deep picking",
  summary:
    "deck.pickMultipleObjects returns every disc stacked under the clicked pixel, nearest first, limited by the depth slider.",
  section: "Interactivity",
  tags: ["pickMultipleObjects", "depth", "deep picking"],
  docs: ["repo/docs/developer-guide/interactivity.md", "repo/docs/api-reference/core/deck.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
