// maplibre-gl example: Default markers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Default markers',
  summary:
    'The default Marker with its documented options: colour, scale, rotation, anchor and rotation alignment, placed on a handful of cities. Buttons move one marker with setLngLat and turn another with setRotation.',
  section: 'Markers and controls',
  tags: ['Marker', 'color', 'scale', 'rotation', 'anchor'],
  docs: [
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Marker.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/type-aliases/MarkerOptions.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Map.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
