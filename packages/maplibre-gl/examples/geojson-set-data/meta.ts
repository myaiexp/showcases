// maplibre-gl example: GeoJSON setData
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'GeoJSON setData: a growing route',
  summary:
    'A GeoJSON source is animated by calling GeoJSONSource.setData every frame with a longer line and a new head point. The map re-parses the data and redraws on each call.',
  section: 'Sources',
  tags: ['GeoJSONSource', 'setData', 'animation', 'line', 'circle'],
  docs: [
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/GeoJSONSource.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Map.md',
    'pages/maplibre-org/maplibre-style-spec/sources.md',
    'pages/maplibre-org/maplibre-style-spec/layers.md',
    'pages/maplibre-org/maplibre-style-spec/expressions.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
