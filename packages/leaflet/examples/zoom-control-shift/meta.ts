// leaflet example: Shift-click on the zoom buttons
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Shift-click on the zoom buttons",
  summary:
    "A shift-click on a zoom button moves three times zoomDelta instead of one. A slider changes zoomDelta; the card sends plain and shift clicks to the buttons and the caption names the level reached.",
  section: "Controls",
  tags: ["ZoomControl", "zoomDelta", "zoomSnap"],
  docs: ["repo/src/control/ZoomControl.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
