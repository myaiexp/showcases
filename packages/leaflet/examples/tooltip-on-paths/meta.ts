// leaflet example: Tooltips on paths
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tooltips on paths",
  summary:
    "A polyline, a polygon, a circle and a rectangle with bindTooltip. Hovering any point of a shape opens its tooltip at the shape's centre.",
  section: "Popups & tooltips",
  tags: ["bindTooltip", "Polyline", "Polygon", "Circle", "Rectangle"],
  docs: [
    'repo/src/layer/Tooltip.js',
    'repo/src/layer/DivOverlay.js',
    'repo/src/layer/Layer.js',
    'repo/src/layer/vector/Polyline.js',
    'repo/src/layer/vector/Circle.js',
    'repo/src/layer/vector/Rectangle.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
