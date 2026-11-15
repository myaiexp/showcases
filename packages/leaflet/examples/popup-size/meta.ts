// leaflet example: Popup maxWidth, minWidth and maxHeight
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Popup maxWidth, minWidth and maxHeight",
  summary:
    "Four markers with popups of different size options: the default maxWidth of 300, maxWidth 110 wrapping the text sooner, minWidth 150 on short text, and maxHeight 50 turning the content into a scrolling area. Sliders change the last one's limits and call update().",
  section: "Popups & tooltips",
  tags: ["maxWidth", "minWidth", "maxHeight", "update", "bindPopup"],
  docs: ["repo/src/layer/Popup.js", "repo/src/layer/DivOverlay.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
