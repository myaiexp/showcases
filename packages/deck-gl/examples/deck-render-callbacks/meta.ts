// deck-gl example: Deck: onBeforeRender, onAfterRender, redraw
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Deck: onBeforeRender, onAfterRender, redraw',
  summary:
    'The two render callbacks counted as frames pass: a still scene draws nothing, redraw() with no argument only draws when something changed, and redraw with a reason string forces a frame.',
  section: 'Deck',
  tags: ['Deck', 'onBeforeRender', 'onAfterRender', 'redraw'],
  docs: ['repo/docs/api-reference/core/deck.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
