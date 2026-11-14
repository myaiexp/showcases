// deck-gl example: MapLibreOverlay: Interleaved
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'MapLibreOverlay: Interleaved',
  summary:
    'The MapLibre integration with interleaved: true: a deck.gl ColumnLayer inside a MapLibre map (on a style built from local GeoJSON), added as a control, sharing the map camera and WebGL context.',
  section: 'Base maps',
  tags: ['MapLibreOverlay', 'interleaved', 'ColumnLayer', 'addControl'],
  docs: [
    'repo/docs/api-reference/maplibre/overview.md',
    'repo/docs/developer-guide/base-maps/using-with-maplibre.md',
    'repo/docs/get-started/using-with-map.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
