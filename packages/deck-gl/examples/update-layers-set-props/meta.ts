// deck-gl example: Updating layers with setProps
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Updating layers with setProps",
  summary:
    "A timer feed rebuilds the same layers with new data every tick and calls deck.setProps; the same ids let deck.gl match and update them.",
  section: "Getting started",
  tags: ["setProps", "layers", "id", "data"],
  docs: ["repo/docs/developer-guide/using-layers.md", "repo/docs/api-reference/core/layer.md", "repo/docs/api-reference/core/deck.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
