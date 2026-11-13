// maplibre-gl example: Draggable marker
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Draggable marker',
  summary:
    'A Marker with draggable: true. Its dragstart, drag and dragend events feed a live coordinate readout.',
  section: 'Markers and controls',
  tags: ['Marker', 'draggable', 'dragend', 'events'],
  docs: [
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Marker.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/type-aliases/MarkerOptions.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/MarkerDragEvent.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Map.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
