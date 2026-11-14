// deck-gl example: Deck _animate forces redraws
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Deck _animate forces redraws',
  summary:
    'A static scene redraws only when something changes. Turning on the experimental _animate prop makes Deck redraw every frame, which the once-a-second _onMetrics callback reports as framesRedrawn.',
  section: 'Animations and transitions',
  tags: ['_animate', '_onMetrics', 'framesRedrawn'],
  docs: [
    'repo/docs/api-reference/core/deck.md',
    'repo/docs/developer-guide/animations-and-transitions.md',  ],
  provenance: 'pure',
  added: '2026-11-14',
});
