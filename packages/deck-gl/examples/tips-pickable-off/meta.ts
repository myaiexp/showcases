// deck-gl example: Deck _pickable and a layer pickable flag
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Deck _pickable and a layer pickable flag',
  summary:
    "Picking draws every pickable layer into an offscreen buffer on hover. Leaving pickable false on layers that do not need it, or turning off Deck's experimental _pickable, saves that work; a hover readout shows when picking stops answering.",
  section: 'Data and performance',
  tags: ['_pickable', 'pickable', 'picking', 'hover', 'performance'],
  docs: [
    'repo/docs/developer-guide/tips-and-tricks.md',
    'repo/docs/developer-guide/performance.md',
    'repo/docs/api-reference/core/deck.md',  ],
  provenance: 'pure',
  added: '2026-11-14',
});
