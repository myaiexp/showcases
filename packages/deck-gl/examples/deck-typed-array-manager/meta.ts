// deck-gl example: Deck: _typedArrayManagerProps
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Deck: _typedArrayManagerProps',
  summary:
    'The experimental overAlloc setting: attributes are allocated overAlloc times the memory they need so data updates are fast; load point sets under overAlloc 1, 2 and 4 and read the GPU buffer memory from _onMetrics.',
  section: 'Deck',
  tags: ['Deck', '_typedArrayManagerProps', 'overAlloc', 'metrics'],
  docs: ['repo/docs/api-reference/core/deck.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
