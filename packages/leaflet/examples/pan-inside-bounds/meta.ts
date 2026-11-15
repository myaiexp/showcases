// leaflet example: panInsideBounds
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "panInsideBounds",
  summary:
    "Drag the map out of a dashed rectangle, then call panInsideBounds(bounds) to pan to the closest view that lies inside it. Options for a slower pan and for no animation are on buttons, and the card scripts a drag and then the call.",
  section: "Map view",
  tags: ["panInsideBounds", "PanOptions", "Rectangle", "dragging"],
  docs: ["repo/src/map/Map.js", "repo/src/layer/vector/Rectangle.js", "repo/src/map/handler/DragHandler.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
