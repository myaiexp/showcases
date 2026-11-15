// leaflet example: Translating built-in text
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Translating built-in text",
  summary:
    `Screen readers announce the labels of Leaflet's controls, which are English unless the translate map option says otherwise. The option takes a function from English text to the page's language; here the Ukrainian dictionary from the accessibility guide covers the map, the marker's default alt, the zoom, layers and fullscreen controls and the popup close button. Switching language rebuilds the map, because text is translated when it is rendered.`,
  section: "Accessibility & mobile",
  tags: ["translate", "LeafletMap.translate", "ZoomControl", "LayersControl", "FullscreenControl", "Marker.alt", "Popup"],
  docs: ["repo/docs/examples/accessibility/index.md", "repo/src/map/Map.js", "repo/src/layer/Popup.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
