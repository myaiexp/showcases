// tsl-textures example: Voronoi cells
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Voronoi cells',
  summary:
    'voronoiCells() on a colorNode: a 3D Voronoi diagram as Worley noise, with scale, colour variation, how facetted each cell is, the cell and boundary colours and the seed live, and the docs page\'s three snapshots.',
  section: 'Textures',
  tags: ['voronoiCells', 'colorNode', 'facet', 'variation', 'worley'],
  docs: ['repo/docs/voronoi-cells.md', 'repo/src/voronoi-cells.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
