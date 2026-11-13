// maplibre-gl example: Zoom expressions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Zoom expressions',
  summary:
    'Camera expressions built on the zoom operator: interpolate varies circle radius, line width and opacity smoothly with zoom, while step switches circle colour at fixed zoom levels. The preview zooms in and out on its own.',
  section: 'Expressions',
  tags: ['zoom', 'interpolate', 'step', 'camera expressions'],
  docs: [
    'pages/maplibre-org/maplibre-style-spec/expressions.md',
    'pages/maplibre-org/maplibre-style-spec/layers.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Map.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
