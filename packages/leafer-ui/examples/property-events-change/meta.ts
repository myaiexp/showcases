// leafer-ui example: PropertyEvent: change, leafer_change and scroll
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PropertyEvent: change, leafer_change and scroll",
  summary: "Setting an attribute dispatches property.change to the element and then to the Leafer; property.leafer_change goes only to the Leafer. Each change reports attrName, oldValue and newValue. Dragging the rect shows x and y changing.",
  section: "Events",
  tags: ["PropertyEvent.CHANGE", "PropertyEvent.LEAFER_CHANGE", "attrName", "oldValue", "newValue"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/event/basic/Property.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
