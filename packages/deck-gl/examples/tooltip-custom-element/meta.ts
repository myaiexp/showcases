// deck-gl example: Custom tooltip element
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Custom tooltip element",
  summary:
    "No getTooltip: a layer onHover moves your own DOM element to info.x, info.y. The card drives the same handler from real deck.pickObject calls.",
  section: "Interactivity",
  tags: ["onHover", "tooltip", "pickObject", "PickingInfo"],
  docs: ["repo/docs/developer-guide/interactivity.md", "repo/docs/api-reference/core/deck.md", "repo/docs/api-reference/core/layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
