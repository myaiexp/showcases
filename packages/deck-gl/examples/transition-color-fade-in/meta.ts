// deck-gl example: Colour and radius transitions with a fade-in enter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Colour and radius transitions with a fade-in enter',
  summary:
    'getFillColor and getRadius transitions with a sine easing, and an enter callback that backfills new points with alpha 0 so they fade in instead of popping up. Recolour or grow the data to see it.',
  section: 'Animations and transitions',
  tags: ['transitions', 'getFillColor', 'getRadius', 'enter', 'easing', 'attribute backfilling'],
  docs: [
    'repo/docs/developer-guide/animations-and-transitions.md',
    'repo/docs/api-reference/core/layer.md',  ],
  provenance: 'pure',
  added: '2026-11-14',
});
