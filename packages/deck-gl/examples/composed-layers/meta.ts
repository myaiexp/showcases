// deck-gl example: Composing layers in order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Composing layers in order",
  summary:
    "Several layers in one Deck drawn in array order; layers accepts nested arrays and falsy entries, so checkboxes switch groups off inline.",
  section: "Getting started",
  tags: ["layers", "LayersList", "ArcLayer", "ScatterplotLayer", "TextLayer"],
  docs: ["repo/docs/developer-guide/using-layers.md", "repo/docs/api-reference/core/deck.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
