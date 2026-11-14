// The getting-started doodle made random with @p and @r, redrawn with new seeds
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Make it random',
  summary:
    'Changing @pn to @p makes each cell pick its leaf shape at random, and @r(.5, 1) gives each one a random scale. Every update() draws with a new seed; a CSS transition in the doodle lets the cells move to their new values.',
  section: 'Getting started',
  tags: ['@p', '@r', 'seed', 'update()', 'transition'],
  docs: [
    'pages/css-doodle-com/getting-started.md',
    'pages/css-doodle-com/reference/function-p.md',
    'pages/css-doodle-com/reference/function-r.md',
    'pages/css-doodle-com/reference/js-api-update.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
