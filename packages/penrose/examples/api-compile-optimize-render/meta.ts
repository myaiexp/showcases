// penrose example: compile, optimize, toSVG
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'compile, optimize, toSVG',
  summary:
    'The Language API page\'s own script: `compile` turns the set-theory trio into a `PenroseState` (or an error for `showError`), `optimize` solves it to convergence, and `toSVG` renders it as an SVG element. The full view times each step; every variation is a different solution of the same trio.',
  section: 'Language API',
  tags: ['compile', 'optimize', 'toSVG', 'showError', 'Result'],
  docs: ['repo/packages/docs-site/docs/ref/api.md', 'repo/packages/core/src/index.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
