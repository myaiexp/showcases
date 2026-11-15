// leaflet example: setView: jump or glide
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "setView: jump or glide",
  summary:
    "Five city buttons call setView(city, 5, options). Neighbouring cities glide with a pan animation whose duration you set; Tokyo is off screen, so the view just resets. A select switches the options between {duration}, {animate: true, duration} and {reset: true}, and the log prints movestart and moveend with the time taken.",
  section: "Map view",
  tags: ["setView", "ZoomPanOptions", "animate", "duration", "reset", "movestart", "moveend"],
  docs: ["repo/src/map/Map.js", "repo/MIGRATION.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
