// l7 example: GeoJSON-VT promoteId
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'GeoJSON-VT promoteId',
  summary:
    'promoteId names a feature property to use as the feature id, so featureId, hover highlight and picking all follow your own ids (here the country\'s id field).',
  section: 'Tile Layer',
  tags: ['PolygonLayer', 'Source', 'geojsonvtOptions', 'promoteId', 'featureId', 'active'],
  docs: [
    'repo/site/docs/api/tile/geojsonvt_tile_layer.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
