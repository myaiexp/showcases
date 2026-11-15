// leaflet example: SimpleCRS pointer coordinates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SimpleCRS pointer coordinates",
  summary:
    "Pointer position over the SimpleCRS star map: the event's latlng read as [y, x] in map units, and the image pixel it maps to from the measured bounds. The card moves a ghost pointer between stars.",
  section: "Coordinate systems",
  tags: ["SimpleCRS", "pointermove", "latlng", "ImageOverlay"],
  docs: ["repo/docs/examples/crs-simple/index.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
