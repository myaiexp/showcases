// The grid property: set the grid attribute, read the rendered grid
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The grid property',
  summary:
    'Setting doodle.grid = \'3x4\' writes the grid attribute and re-renders; reading doodle.grid gives the grid in use as { x, y, z, count, ratio }, shown under the doodle after each render. The code has no @grid, because a @grid in the code would win over the attribute.',
  section: 'Element API',
  tags: ['grid', 'grid attribute', 'render'],
  docs: ['pages/css-doodle-com/reference/js-api-grid.md', 'pages/css-doodle-com/reference/attribute-grid.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
