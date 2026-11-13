// maplibre-gl example: Custom control
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom control',
  summary:
    'A small control written against the IControl interface (onAdd and onRemove): a button bar that flies to each continent.',
  section: 'Markers and controls',
  tags: ['IControl', 'addControl', 'onAdd', 'onRemove'],
  docs: [
    'pages/maplibre-org/maplibre-gl-js/docs/API/interfaces/IControl.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Map.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/type-aliases/ControlPosition.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/type-aliases/FlyToOptions.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
