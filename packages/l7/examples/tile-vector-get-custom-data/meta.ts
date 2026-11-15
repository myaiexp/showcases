// l7 example: Vector tiles: getCustomData
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Vector tiles: getCustomData',
  summary:
    'parser.getCustomData(tile, callback) replaces the tile request: the page answers each {z, x, y} itself with a protobuf ArrayBuffer, here after a short delay, as when tiles need auth or special handling.',
  section: 'Tile Layer',
  tags: ['getCustomData', 'type: \'mvt\'', 'sourceLayer', 'PolygonLayer'],
  docs: [
    'repo/site/docs/api/source/mvt.en.md',
    'repo/site/docs/api/tile/vector_tile_layer.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
