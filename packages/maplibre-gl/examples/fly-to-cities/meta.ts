// maplibre-gl example: Fly to cities
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fly to cities',
  summary:
    'Map.flyTo glides between the shared cities along a zooming arc. The full view exposes the FlyToOptions curve and speed so you can feel how they change the flight.',
  section: 'Map',
  tags: ['flyTo', 'curve', 'speed', 'camera'],
  docs: [
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Map.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/type-aliases/FlyToOptions.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/type-aliases/AnimationOptions.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
