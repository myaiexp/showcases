// l7 example: GeoJSON-VT tiles: polygons
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'GeoJSON-VT tiles: polygons',
  summary:
    'Source parser type \'geojsonvt\' slices a GeoJSON object into vector tiles in the browser, so a tile layer needs no tile server and no sourceLayer.',
  section: 'Tile Layer',
  tags: ['PolygonLayer', 'Source', 'type: \'geojsonvt\'', 'maxZoom', 'featureId'],
  docs: [
    'repo/site/docs/api/tile/geojsonvt_tile_layer.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
