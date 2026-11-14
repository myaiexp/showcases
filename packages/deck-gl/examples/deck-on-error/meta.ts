// deck-gl example: Deck: onError
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Deck: onError',
  summary:
    'An accessor that throws for one row: Deck passes the error and the originating layer to onError and keeps drawing the rest of the scene; fixing the accessor clears it.',
  section: 'Deck',
  tags: ['Deck', 'onError', 'accessor'],
  docs: ['repo/docs/api-reference/core/deck.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
