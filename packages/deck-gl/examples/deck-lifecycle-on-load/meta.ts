// deck-gl example: Deck: onLoad and isInitialized
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Deck: onLoad and isInitialized',
  summary:
    'The order of a Deck coming up: the constructor returns with isInitialized false, and onLoad fires once its managers exist and isInitialized turns true; rebuild a Deck to see it again.',
  section: 'Deck',
  tags: ['Deck', 'onLoad', 'isInitialized', 'finalize'],
  docs: ['repo/docs/api-reference/core/deck.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
