// leaflet example: Popup className
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Popup className",
  summary:
    "Two popups given different className values, restyled with plain CSS: a red square-cornered one and a yellow rounded one. The class sits on the .leaflet-popup element next to Leaflet's own.",
  section: "Popups & tooltips",
  tags: ["className", "bindPopup"],
  docs: [
    'repo/src/layer/Popup.js',
    'repo/src/layer/DivOverlay.js',
    'repo/src/layer/marker/Marker.js',
    'repo/src/layer/LayerBase.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
