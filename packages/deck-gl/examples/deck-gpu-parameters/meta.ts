// deck-gl example: Deck: Global GPU parameters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Deck: Global GPU parameters',
  summary:
    'The Deck parameters prop sets luma.gl GPU state before every frame: overlapping translucent discs under the default blend, additive blending, no blending, and with the depth test off.',
  section: 'Deck',
  tags: ['Deck', 'parameters', 'blend', 'depthCompare', 'depthWriteEnabled'],
  docs: ['repo/docs/api-reference/core/deck.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
