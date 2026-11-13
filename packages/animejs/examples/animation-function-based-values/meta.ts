// anime.js example: Function-based tween values
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Function-based tween values',
  summary: 'Every property takes a function that sees the target, its index and the whole target list. Values come from data attributes, the index and utils.random, and refresh() re-rolls them.',
  section: 'Animation',
  tags: ['animate', 'function-based values', 'utils.random', 'refresh', 'restart'],
  docs: [
    'pages/animejs-com/documentation/animation/tween-value-types/function-based.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
