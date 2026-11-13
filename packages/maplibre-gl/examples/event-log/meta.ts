// maplibre-gl example: Event log
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Event log',
  summary:
    'A scrolling log of what a map fires: load and idle, the start/during/end triplets for move, zoom, rotate and pitch, mouse events with lngLat and point, and data events. Repeats of the same event fold into one counted line.',
  section: 'Events',
  tags: ['Evented', 'on', 'MapEventType', 'move', 'zoom', 'click', 'sourcedata'],
  docs: [
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Evented.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/type-aliases/MapEventType.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/MapMouseEvent.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/MapMovementEvent.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/MapSourceDataEvent.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/MapLibreEvent.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Map.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
