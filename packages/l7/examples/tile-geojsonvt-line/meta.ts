// l7 example: GeoJSON-VT tiles: lines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'GeoJSON-VT tiles: lines',
  summary:
    'A LineLayer on a geojsonvt source draws line features sliced from in-memory GeoJSON: here the border segments between countries.',
  section: 'Tile Layer',
  tags: ['LineLayer', 'Source', 'type: \'geojsonvt\''],
  docs: [
    'repo/site/docs/api/tile/geojsonvt_tile_layer.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
