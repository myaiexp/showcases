// maplibre-gl example: Fit bounds
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fit bounds',
  summary:
    'Map.fitBounds frames groups of cities using a LngLatBounds grown with extend. Padding and maxZoom options change how tightly the camera zooms, and a dashed box shows the bounds.',
  section: 'Map',
  tags: ['fitBounds', 'LngLatBounds', 'padding', 'maxZoom'],
  docs: [
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Map.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/LngLatBounds.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/type-aliases/FitBoundsOptions.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/type-aliases/PaddingOptions.md',
    'pages/maplibre-org/maplibre-style-spec/layers.md',
    'pages/maplibre-org/maplibre-style-spec/sources.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/GeoJSONSource.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
