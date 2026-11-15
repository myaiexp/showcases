// leaflet example: What assistive technology reads
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "What assistive technology reads",
  summary:
    `A readout of the ARIA and keyboard attributes Leaflet puts on the map: the container's role, aria-label and tabindex, a marker's role, tabindex and alt, a DivIcon marker named by visually hidden text, the zoom buttons' aria-label and the popup close button. Opening a popup adds aria-expanded and aria-controls to its marker. The ariaKeyShortcuts option, off by default, sets aria-keyshortcuts on the container.`,
  section: "Accessibility & mobile",
  tags: ["ariaKeyShortcuts", "aria-label", "alt", "DivIcon", "Marker.keyboard", "Popup", "KeyboardHandler"],
  docs: ["repo/docs/examples/accessibility/index.md", "repo/src/map/Map.js", "repo/src/map/handler/KeyboardHandler.js", "repo/src/layer/marker/Marker.js", "repo/src/layer/Popup.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
