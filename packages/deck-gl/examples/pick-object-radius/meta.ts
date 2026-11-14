// deck-gl example: pickObject with a radius
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "pickObject with a radius",
  summary:
    "Click probes with deck.pickObjectAsync({x, y, radius, layerIds}); a ring shows the reach and the closest city in it highlights.",
  section: "Interactivity",
  tags: ["pickObjectAsync", "pickObject", "radius", "layerIds"],
  docs: ["repo/docs/developer-guide/interactivity.md", "repo/docs/api-reference/core/deck.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
