// deck-gl example: Drawing the picking buffer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Drawing the picking buffer',
  summary:
    "Deck's drawPickingColors debug prop paints the offscreen picking buffer on screen, where every pickable object has its own flat colour. Toggle it to see exactly what the picking pass draws, including layers that are pickable and ones that are not.",
  section: 'Data and performance',
  tags: ['drawPickingColors', 'pickable', 'picking', 'debugging'],
  docs: [
    'repo/docs/developer-guide/debugging.md',
    'repo/docs/api-reference/core/deck.md',  ],
  provenance: 'pure',
  added: '2026-11-14',
});
