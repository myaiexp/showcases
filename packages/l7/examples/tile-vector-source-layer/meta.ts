// l7 example: Vector tiles: sourceLayer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Vector tiles: sourceLayer',
  summary:
    'One tile can hold several named layers; sourceLayer says which one a layer draws. The same tiles hold countries, borders and towns here, and each choice needs its own layer type.',
  section: 'Tile Layer',
  tags: ['sourceLayer', 'type: \'mvt\'', 'PolygonLayer', 'LineLayer', 'PointLayer'],
  docs: [
    'repo/site/docs/api/tile/common/options.en.md',
    'repo/site/docs/api/tile/vector_tile_layer.en.md',
    'repo/site/docs/tutorial/tile/tile.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
