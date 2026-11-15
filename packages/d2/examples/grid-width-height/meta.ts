// d2 example: Grid cell width and height
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Grid cell width and height',
  summary:
    'Setting `width` (or `height`) on a shape builds irregular grids. The row holding the wide shape sets the grid\'s width, and the objects in each row are distributed evenly across it.',
  section: 'Grid Diagrams',
  tags: ['grid-rows', 'width'],
  docs: ['repo/docs/tour/grid-diagrams.md', 'repo/static/d2/grid-dimensions.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
