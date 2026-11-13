// animejs example: stretch() to a new total duration
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Animation stretch method',
  summary:
    'A staggered animation is re-timed with stretch(duration) as you drag a slider, then restarted so the new total length is visible.',
  section: 'Animation',
  tags: ['animate', 'stretch', 'restart', 'stagger', 'delay'],
  docs: [
    'pages/animejs-com/documentation/animation/animation-methods/stretch.md',
    'pages/animejs-com/documentation/animation/animation-methods/restart.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
