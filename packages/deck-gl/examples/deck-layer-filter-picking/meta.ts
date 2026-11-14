// deck-gl example: Deck: layerFilter Picking Halo
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Deck: layerFilter Picking Halo',
  summary:
    'layerFilter receives isPicking: a transparent, larger copy of the dots is kept out of the screen pass and kept in the picking pass, so a pointer 12 px off a dot still hits it.',
  section: 'Deck',
  tags: ['Deck', 'layerFilter', 'isPicking', 'pickObject', 'ScatterplotLayer'],
  docs: ['repo/docs/api-reference/core/deck.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
