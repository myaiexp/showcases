// maplibre-gl example: Query rendered features
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Query rendered features',
  summary:
    'queryRenderedFeatures reads the country under a pixel: the pointer in the full view, a virtual point sweeping the map in the preview. Layer click events deliver e.features.',
  section: 'Map',
  tags: ['queryRenderedFeatures', 'features', 'events', 'project'],
  docs: [
    'pages/maplibre-org/maplibre-style-spec/layers.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Map.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/type-aliases/QueryRenderedFeaturesOptions.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/type-aliases/MapGeoJSONFeature.md',
    'pages/maplibre-org/maplibre-style-spec/expressions.md',
    'pages/maplibre-org/maplibre-style-spec/sources.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
