// css-doodle/generator shape(): clip-path values from @shape code
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'shape(): a clip-path without a doodle',
  summary:
    'shape() from css-doodle/generator takes the same code as @shape and returns a polygon(), or a shape() when round curves the corners, as a string to use as a clip-path. It cycles through presets with a parameter (several arguments are joined with commas, so shape(\'star\', 6) is \'star 6\'), rounded corners and commands; with no code the result is a triangle.',
  section: 'Package exports',
  tags: ['css-doodle/generator', 'shape()', 'clip-path', 'polygon()'],
  docs: ['pages/css-doodle-com/reference/js-api-shape.md', 'pages/css-doodle-com/reference/function-shape.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
