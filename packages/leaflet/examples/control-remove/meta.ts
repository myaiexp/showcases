// leaflet example: Adding and removing controls
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Adding and removing controls",
  summary:
    "ZoomControl and ScaleControl added and removed with addTo, map.addControl, map.removeControl and remove(). The caption says whether each control's container is still in the document.",
  section: "Controls",
  tags: ["Control", "remove", "addTo", "addControl", "removeControl", "getContainer"],
  docs: ["repo/src/control/Control.js", "repo/src/map/Map.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
