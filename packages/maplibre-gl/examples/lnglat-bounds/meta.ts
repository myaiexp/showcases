// maplibre-gl example: LngLatBounds
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'LngLatBounds',
  summary:
    'Click to add points. A LngLatBounds is extended with each one, drawn as a polygon, and queried with contains and getCenter.',
  section: 'Geography and geometry',
  tags: ['LngLatBounds', 'extend', 'contains', 'getCenter'],
  docs: [
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/LngLatBounds.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/LngLat.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/GeoJSONSource.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Map.md',
    'pages/maplibre-org/maplibre-style-spec/layers.md',
    'pages/maplibre-org/maplibre-style-spec/sources.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
