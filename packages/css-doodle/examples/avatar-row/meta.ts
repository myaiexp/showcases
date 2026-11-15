// Avatars on a page: one doodle code, a seed attribute per person
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Avatars on a page',
  summary:
    'The guide\'s "on a page" form: the identicon code with no @seed, at 48px, used by several <css-doodle> elements that each carry a person\'s name in the seed attribute. Every name always draws the same face, so there is no image to store.',
  section: 'Avatars',
  tags: ['seed', '@once', '@dx', '@grid'],
  docs: ['pages/css-doodle-com/avatars.md', 'pages/css-doodle-com/reference/attribute-seed.md', 'pages/css-doodle-com/reference/js-api-seed.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
