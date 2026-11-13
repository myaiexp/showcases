// anime.js example: Modifier functions on tweens
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Modifier functions on tweens',
  summary: 'A modifier receives each animated number before it is applied. One lane rounds it, one wraps it with modulo so the square jumps back, and one gives y its own cosine modifier.',
  section: 'Animation',
  tags: ['animate', 'modifier', 'utils.round'],
  docs: [
    'pages/animejs-com/documentation/animation/tween-parameters/modifier.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
