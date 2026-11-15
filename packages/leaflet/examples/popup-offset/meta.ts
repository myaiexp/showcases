// leaflet example: Popup offset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Popup offset",
  summary:
    "A popup's offset option as [x, y] pixels, moved on a bound popup by changing options.offset and calling update(). The default is [0, 7]; a bigger y lifts the popup, x slides it sideways.",
  section: "Popups & tooltips",
  tags: ["offset", "update", "bindPopup", "CircleMarker"],
  docs: ["repo/src/layer/Popup.js", "repo/src/layer/DivOverlay.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
