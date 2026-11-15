// aframe example: cursor: mouseCursorStylesEnabled changes the pointer over entities
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "cursor: mouseCursorStylesEnabled changes the pointer over entities",
  summary: "With rayOrigin: mouse the cursor adds a hover class to the canvas, which the stylesheet turns into a pointer cursor, while an entity is under it, unless mouseCursorStylesEnabled is false. A toggle flips the property; the read-out shows whether the canvas has that class as the pointer moves over the box.",
  section: 'Components',
  tags: ["cursor", "mouseCursorStylesEnabled", "rayOrigin", "mouse", "a-mouse-cursor-hover"],
  docs: ["repo/docs/components/cursor.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
