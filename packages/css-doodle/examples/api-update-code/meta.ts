// update() with and without new code
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'update() and update(code)',
  summary:
    'doodle.update() renders the same code again with a new seed (no seed attribute or @seed fixes one); doodle.update(code) replaces the code. The card redraws twice, then swaps between two doodles; the caption shows the seed of each render.',
  section: 'Element API',
  tags: ['update()', 'seed', 'render'],
  docs: ['pages/css-doodle-com/reference/js-api-update.md', 'pages/css-doodle-com/reference/event-render.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
