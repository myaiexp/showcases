// deck-gl example: Layer and Deck event bubbling
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layer and Deck event bubbling",
  summary:
    "A layer onHover that returns a truthy value marks the event handled so the Deck onHover never fires; the counters show the difference.",
  section: "Interactivity",
  tags: ["onHover", "bubbling", "Deck", "pickable"],
  docs: ["repo/docs/developer-guide/interactivity.md", "repo/docs/api-reference/core/layer.md", "repo/docs/api-reference/core/deck.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
