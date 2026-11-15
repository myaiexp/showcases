// The landing page's @svg doodle: circles on a polar curve, coloured from a list
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Nested, readable, no XML',
  summary:
    'The home page\'s @svg doodle: one element whose content is an SVG of 2400 circles written in CSS-like blocks. circle*2400 repeats the tag, @Plot puts each copy on a polar curve, a sine of the copy number sets its radius, and @p picks its colour from a custom property list in which "x3" weights one colour.',
  section: 'Getting started',
  tags: ['@svg', '@Plot', '@p', '@n', '@N', 'circle*N', '--c'],
  docs: ['pages/css-doodle-com.md', 'pages/css-doodle-com/reference/function-svg.md', 'pages/css-doodle-com/reference/function-plot.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
