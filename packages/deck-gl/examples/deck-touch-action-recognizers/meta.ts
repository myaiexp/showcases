// deck-gl example: Deck: touchAction and eventRecognizerOptions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Deck: touchAction and eventRecognizerOptions',
  summary:
    'touchAction decides which touch gestures the canvas captures (the CSS touch-action it ends up with is read back), and eventRecognizerOptions.pan.threshold sets how far a drag must move before onDragStart; both apply when the Deck is created.',
  section: 'Deck',
  tags: ['Deck', 'touchAction', 'eventRecognizerOptions', 'onDragStart'],
  docs: ['repo/docs/api-reference/core/deck.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
