// leaflet example: Draggable on any element
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Draggable on any element",
  summary:
    `Draggable, the class behind map and marker dragging, works on any element: new Draggable(element, handle) moves the panel when you drag its orange title bar, and the body is not a handle. Its events (down, dragstart, drag, dragend with the distance) go to the log, getPosition reads the offset, and clickTolerance sets how far a press moves before it counts as a drag. The map under it does not pan while the panel is dragged.`,
  section: "Utilities & DOM",
  tags: ["Draggable", "clickTolerance", "DomUtil.setPosition", "DomUtil.getPosition", "dragend", "Evented.on"],
  docs: ["repo/src/dom/Draggable.js", "repo/src/dom/DomUtil.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
