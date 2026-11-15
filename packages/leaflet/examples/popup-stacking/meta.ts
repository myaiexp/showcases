// leaflet example: Popup bringToFront and bringToBack
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Popup bringToFront and bringToBack",
  summary:
    "Two popups added with addTo that overlap in the popup pane. bringToFront and bringToBack change which one is on top.",
  section: "Popups & tooltips",
  tags: ["Popup", "bringToFront", "bringToBack", "addTo"],
  docs: ['repo/src/layer/Popup.js', 'repo/src/layer/DivOverlay.js', 'repo/src/control/LayersControl.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
