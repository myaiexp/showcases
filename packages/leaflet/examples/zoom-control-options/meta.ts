// leaflet example: Zoom control options
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Zoom control options",
  summary:
    "A map created with zoomControl false, then a ZoomControl added by hand. A select and the card's cycle change its position, its button text (zoomInText, zoomOutText) and its button titles; the caption reads the zoom in button's title.",
  section: "Controls",
  tags: ["ZoomControl", "zoomInText", "zoomOutTitle", "position", "zoomControl"],
  docs: ["repo/src/control/ZoomControl.js", "repo/src/control/Control.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
