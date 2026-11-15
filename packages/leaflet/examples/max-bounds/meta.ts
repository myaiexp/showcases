// leaflet example: setMaxBounds and maxBoundsViscosity
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "setMaxBounds and maxBoundsViscosity",
  summary:
    "The map is restricted to a dashed rectangle over Europe with setMaxBounds. A select sets maxBoundsViscosity to 0, 0.5 or 1 to change how solid the edge is when you drag, and buttons call setMaxBounds() with no argument to lift the limit and setView outside the bounds to see it clamped.",
  section: "Map view",
  tags: ["setMaxBounds", "maxBoundsViscosity", "maxBounds", "dragend", "Rectangle"],
  docs: ["repo/src/map/Map.js", "repo/src/map/handler/DragHandler.js", "repo/src/layer/vector/Rectangle.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
