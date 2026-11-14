// deck-gl example: Tooltip from a string
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tooltip from a string",
  summary:
    "getTooltip returns a string for the hovered city; the layer is pickable with autoHighlight, and a card walks the highlight and names the tooltip it stands for.",
  section: "Interactivity",
  tags: ["getTooltip", "pickable", "autoHighlight", "PickingInfo"],
  docs: ["repo/docs/developer-guide/interactivity.md", "repo/docs/api-reference/core/deck.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
