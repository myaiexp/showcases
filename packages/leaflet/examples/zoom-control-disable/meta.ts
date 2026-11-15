// leaflet example: Disabling the zoom control
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Disabling the zoom control",
  summary:
    "ZoomControl.disable() and enable() on a map limited to zoom 2 to 6. The caption reports whether each button is greyed; at the zoom limits the matching button greys itself. The card presses the buttons by script.",
  section: "Controls",
  tags: ["ZoomControl", "disable", "enable", "minZoom", "maxZoom"],
  docs: ["repo/src/control/ZoomControl.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
