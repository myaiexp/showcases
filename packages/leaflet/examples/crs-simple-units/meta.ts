// leaflet example: SimpleCRS units and zoom
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SimpleCRS units and zoom",
  summary:
    "On a SimpleCRS map one unit is 2^zoom pixels. The caption reads SimpleCRS.scale and SimpleCRS.zoom at the current zoom and the width of the view in map units; a slider sets a fractional zoom.",
  section: "Coordinate systems",
  tags: ["SimpleCRS", "scale", "zoom", "minZoom", "zoomSnap"],
  docs: ["repo/docs/examples/crs-simple/index.md", "repo/src/geo/crs/SimpleCRS.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
