// l7 example: Tile layer events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tile layer events',
  summary:
    'Tile layers take the same on(\'click\') as any layer; the event carries the feature merged from every tile that holds a piece of it. Click a country to read its feature.',
  section: 'Tutorial: Tile',
  tags: ['PolygonLayer', 'on', 'click', 'featureId', 'select', 'type: \'mvt\''],
  docs: [
    'repo/site/docs/tutorial/tile/tile.en.md',
    'repo/site/docs/api/tile/common/style.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
