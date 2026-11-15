// leaflet example: zoomIn, zoomOut and setZoom
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "zoomIn, zoomOut and setZoom",
  summary:
    "Buttons call zoomIn(), zoomOut(), zoomIn(0.5), setZoom(3) and setZoom(8, {animate: false}). Calling zoomIn() twice quickly zooms two levels, because Leaflet 2 builds each call on the zoom the running animation is heading to. A log shows zoomstart and zoomend.",
  section: "Map view",
  tags: ["zoomIn", "zoomOut", "setZoom", "ZoomOptions", "zoomstart", "zoomend"],
  docs: ["repo/src/map/Map.js", "repo/MIGRATION.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
