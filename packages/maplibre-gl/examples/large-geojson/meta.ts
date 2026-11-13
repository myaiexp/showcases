// maplibre-gl example: Large GeoJSON
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Large GeoJSON',
  summary:
    'Tens of thousands of generated points on one GeoJSON source, tuned with the options the large-data guide recommends: clustering, maxzoom, tolerance and buffer. A readout shows the point count and time to first tiles.',
  section: 'Guides',
  tags: ['geojson', 'performance', 'cluster', 'maxzoom', 'tolerance', 'buffer'],
  docs: [
    'repo/docs/guides/large-data.md',
    'pages/maplibre-org/maplibre-style-spec/sources.md',
    'pages/maplibre-org/maplibre-style-spec/layers.md',
    'pages/maplibre-org/maplibre-style-spec/expressions.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Map.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
