// leaflet example: Marker keyboard use
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Marker keyboard use",
  summary: "Markers are keyboard operable: with keyboard: true (the default) each is a tab stop, Enter or Space clicks it, and the arrow keys move a draggable one by 10 px, or 30 with Shift. keyboard: false takes a marker out of the tab order.",
  section: "Markers & icons",
  tags: ["Marker", "keyboard", "draggable", "click", "dragstart", "dragend"],
  docs: ["repo/src/layer/marker/Marker.js", "repo/src/layer/marker/Marker.Drag.js", "repo/docs/examples/accessibility/index.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
