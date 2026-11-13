// maplibre-gl example: Cooperative gestures
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Cooperative gestures',
  summary:
    'The cooperativeGestures map option asks for Ctrl/Cmd to zoom with the wheel and two fingers to pan on touch, and fires cooperativegestureprevented when it blocks a gesture.',
  section: 'Handlers',
  tags: ['cooperativeGestures', 'handler', 'scroll'],
  docs: [
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/CooperativeGesturesHandler.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/type-aliases/GestureOptions.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/type-aliases/MapOptions.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/type-aliases/MapEventType.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Map.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
