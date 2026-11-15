// leaflet example: Tab order through a map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tab order through a map",
  summary:
    `Tab moves through the map container, then its markers, then its controls, in DOM order. A list shows every focusable element inside the map in that order, and Next calls focus() on the following one, which is what a Tab press does; in the full view a real Tab press works too. The element in focus gets an orange ring. A marker with keyboard set to false is skipped.`,
  section: "Accessibility & mobile",
  tags: ["tabindex", "Marker.keyboard", "focus", "ZoomControl", "KeyboardHandler"],
  docs: ["repo/docs/examples/accessibility/index.md", "repo/src/layer/marker/Marker.js", "repo/src/map/handler/KeyboardHandler.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
