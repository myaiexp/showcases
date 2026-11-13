// maplibre-gl example: Canvas source
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Canvas source',
  summary:
    'A CanvasSource shows an HTML canvas on the map. A radar sweep is drawn into a 2D canvas every frame and stretched over a geographic quad, with animate: true and play/pause to control updates.',
  section: 'Sources',
  tags: ['CanvasSource', 'canvas', 'animate', 'play', 'pause'],
  docs: [
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/CanvasSource.md',
    'pages/maplibre-org/maplibre-style-spec/sources.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Map.md',
    'pages/maplibre-org/maplibre-style-spec/layers.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
