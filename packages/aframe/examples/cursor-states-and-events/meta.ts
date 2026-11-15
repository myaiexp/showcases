// aframe example: cursor: events, states and event detail
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "cursor: events, states and event detail",
  summary: "A mouse cursor over three boxes reports every event the docs list (mouseenter, mouseleave, mousedown, mouseup, click) with the detail they carry: intersection.point, intersectedEl on the cursor entity and mouseEvent.button. The cursor-hovering and cursor-hovered states show in the read-out; right-click is reported as a different button.",
  section: 'Components',
  tags: ["cursor", "mouseenter", "mouseleave", "mousedown", "mouseup", "click", "cursor-hovering", "cursor-hovered", "states", "intersectedEl", "mouseEvent", "intersection"],
  docs: ["repo/docs/components/cursor.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
