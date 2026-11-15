// leaflet example: Scale control options
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Scale control options",
  summary:
    "A ScaleControl rebuilt with different maxWidth, metric, imperial and updateWhenIdle options while the map zooms. The caption reads the control's text, a round number of metres or feet that fits in maxWidth pixels.",
  section: "Controls",
  tags: ["ScaleControl", "maxWidth", "metric", "imperial", "updateWhenIdle"],
  docs: ["repo/src/control/ScaleControl.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
