// The seed property: read the seed of a render, set it to reproduce the picture
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Keeping a seed you like',
  summary:
    'doodle.seed reads the seed that produced the current picture, always as a string. Setting doodle.seed writes the seed attribute and re-renders, so a kept seed brings the same picture back. In the full view "Keep this seed" adds a button per kept seed; the card draws three pictures and then returns to the first.',
  section: 'Element API',
  tags: ['seed', 'update()', 'seed attribute'],
  docs: ['pages/css-doodle-com/reference/js-api-seed.md', 'pages/css-doodle-com/reference/attribute-seed.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
