// leaflet example: zoom-scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "getZoomScale and getScaleZoom",
  summary:
    "getScaleZoom(scale, fromZoom) gives the zoom reached by scaling the map by a factor, and getZoomScale(toZoom, fromZoom) gives the factor back. A selector picks a scale from zoom 2 and the map zooms there (zoomSnap 0, grid tiles).",
  section: "Map events & conversion",
  tags: ["getScaleZoom", "getZoomScale", "setZoom", "zoomSnap"],
  docs: ["repo/src/map/Map.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
