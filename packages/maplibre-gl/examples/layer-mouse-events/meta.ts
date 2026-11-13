// maplibre-gl example: Layer mouse events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Layer mouse events',
  summary:
    'Passing a layer id to Map.on scopes mouseenter, mouseleave and click to that layer. Hovering a city changes the cursor and highlights it, clicking fills a readout, and once and off show a one-shot and a removed listener.',
  section: 'Events',
  tags: ['on', 'once', 'off', 'MapLayerEventType', 'mouseenter', 'mouseleave', 'feature-state'],
  docs: [
    'pages/maplibre-org/maplibre-gl-js/docs/API/type-aliases/MapLayerEventType.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Map.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Evented.md',
    'pages/maplibre-org/maplibre-style-spec/expressions.md',
    'pages/maplibre-org/maplibre-style-spec/layers.md',
    'pages/maplibre-org/maplibre-style-spec/sources.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/type-aliases/MapLayerMouseEvent.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
