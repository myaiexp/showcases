// l7 example: GeoJSON-VT tolerance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'GeoJSON-VT tolerance',
  summary:
    'geojsonvtOptions.tolerance simplifies geometry when tiles are cut: 3 is the default, and higher values (100) turn coastlines into blunt polygons.',
  section: 'Tile Layer',
  tags: ['PolygonLayer', 'Source', 'geojsonvtOptions', 'tolerance'],
  docs: [
    'repo/site/docs/api/tile/geojsonvt_tile_layer.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
