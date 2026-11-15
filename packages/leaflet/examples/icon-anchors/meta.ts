// leaflet example: Icon anchors visualised
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Icon anchors visualised",
  summary: "Sliders for iconAnchor, popupAnchor and tooltipAnchor of a leaf icon, with a red dot at the marker position. The anchor picks which image pixel sits on the dot; the popup and the tooltip open at their offsets from that pixel. Each change builds a new Icon and calls setIcon().",
  section: "Markers & icons",
  tags: ["Icon", "iconAnchor", "popupAnchor", "tooltipAnchor", "setIcon", "DivIcon", "bindPopup", "bindTooltip"],
  docs: [
    'repo/src/layer/marker/Icon.js',
    'repo/src/layer/marker/Marker.js',
    'repo/docs/examples/custom-icons/index.md',
    'repo/docs/examples/custom-icons/leaf-green.png',
    'repo/src/layer/Layer.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
