// maplibre-gl example: Circle layer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Circle layer',
  summary:
    'A circle layer over a seeded set of points, where circle-radius, circle-color and circle-stroke-color are expressions reading each feature\'s properties. The full view adds blur, opacity and pitch-alignment controls.',
  section: 'Layers',
  tags: ['circle', 'data-driven', 'paint', 'geojson'],
  docs: [
    'pages/maplibre-org/maplibre-style-spec/layers.md',
    'pages/maplibre-org/maplibre-style-spec/expressions.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Map.md',
    'pages/maplibre-org/maplibre-style-spec/sources.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
