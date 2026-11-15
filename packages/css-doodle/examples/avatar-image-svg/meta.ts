// Avatars rendered ahead of time to SVG with image() from css-doodle/generator
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Avatar rendered to an SVG file',
  summary:
    'The avatars guide renders the identicon ahead of time with image() from css-doodle/generator: it takes the doodle code and a seed, width and height, and resolves to standalone SVG text. Here each name\'s SVG is shown in an <img>, with no <css-doodle> element on the page.',
  section: 'Avatars',
  tags: ['image()', 'css-doodle/generator', 'seed', 'SVG'],
  docs: ['pages/css-doodle-com/avatars.md', 'pages/css-doodle-com/reference/js-api-image.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
