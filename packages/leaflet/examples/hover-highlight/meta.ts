// leaflet example: Hover highlight
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Hover highlight",
  summary:
    "Four shapes that restyle on pointerover with setStyle and bringToFront, then restore on pointerout. The card fakes the pointer.",
  section: "Vector layers",
  tags: ["Polygon", "Rectangle", "Circle", "pointerover", "pointerout", "setStyle", "bringToFront"],
  docs: ["repo/src/layer/vector/Path.js", "repo/src/layer/Layer.js", "repo/src/layer/vector/Polygon.js", "repo/src/layer/vector/Rectangle.js", "repo/src/layer/vector/Circle.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
