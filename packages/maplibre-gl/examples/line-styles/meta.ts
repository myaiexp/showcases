// maplibre-gl example: Line styles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Line styles',
  summary:
    'Line layers on generated routes between cities: a line-progress gradient (needs lineMetrics on the source), a dotted line-dasharray, line-width by zoom, line-offset copies, and a zigzag where line-cap and line-join can be changed.',
  section: 'Layers',
  tags: ['line', 'line-gradient', 'line-dasharray', 'line-offset', 'line-cap', 'line-join'],
  docs: [
    'pages/maplibre-org/maplibre-style-spec/layers.md',
    'pages/maplibre-org/maplibre-style-spec/sources.md',
    'pages/maplibre-org/maplibre-style-spec/expressions.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Map.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
