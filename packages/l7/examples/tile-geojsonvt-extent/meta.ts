// l7 example: GeoJSON-VT tile extent
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'GeoJSON-VT tile extent',
  summary:
    'geojsonvtOptions.extent is the grid each tile\'s coordinates snap to (4096 by default). A tiny extent rounds the shapes onto a coarse lattice you can see.',
  section: 'Tile Layer',
  tags: ['PolygonLayer', 'Source', 'geojsonvtOptions', 'extent'],
  docs: [
    'repo/site/docs/api/tile/geojsonvt_tile_layer.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
