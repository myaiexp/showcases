// maplibre-gl example: Globe to Mercator by zoom
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Globe to Mercator by zoom',
  summary:
    'The projection type is an interpolate expression on zoom: a vertical-perspective globe when zoomed out, mercator when zoomed in, and a blend between. Zoom buttons walk through it.',
  section: 'Projection',
  tags: ['projection', 'globe', 'mercator', 'interpolate', 'zoom', 'expression'],
  docs: [
    'pages/maplibre-org/maplibre-style-spec/projection.md',
    'pages/maplibre-org/maplibre-style-spec/types.md',
    'pages/maplibre-org/maplibre-style-spec/expressions.md',
    'pages/maplibre-org/maplibre-style-spec/sky.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Map.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
