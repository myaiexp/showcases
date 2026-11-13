// maplibre-gl example: Popups
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Popups',
  summary:
    'A Popup attached to a marker with setPopup, and another opened wherever you click a country with setLngLat and setDOMContent, using the closeButton, maxWidth and offset options.',
  section: 'Markers and controls',
  tags: ['Popup', 'setPopup', 'setDOMContent', 'closeButton', 'maxWidth'],
  docs: [
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Popup.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/type-aliases/PopupOptions.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Marker.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Map.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
