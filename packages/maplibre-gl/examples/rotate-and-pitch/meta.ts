// maplibre-gl example: Rotate and pitch
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rotate and pitch',
  summary:
    'Camera bearing and pitch through rotateTo, setPitch, easeTo with a pitch, resetNorth and resetNorthPitch. The gallery preview orbits the camera.',
  section: 'Map',
  tags: ['rotateTo', 'setPitch', 'resetNorth', 'bearing', 'pitch'],
  docs: [
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Map.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/type-aliases/EaseToOptions.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/type-aliases/CameraOptions.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/type-aliases/AnimationOptions.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
