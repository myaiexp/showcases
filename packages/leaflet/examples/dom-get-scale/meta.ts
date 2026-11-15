// leaflet example: DomUtil.getScale and CSS scaling
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "DomUtil.getScale and CSS scaling",
  summary:
    `The map box sits under a CSS transform: scale, as it would inside a zoomed or transformed page. DomUtil.getScale reads the scale back as the ratio of the bounding box to the layout size, and DomEvent.getPointerPosition and the map's own pointer events divide it out, so the container point stays in the map's unscaled pixels. A naive clientX minus left is off by the scale.`,
  section: "Utilities & DOM",
  tags: ["DomUtil.getScale", "DomEvent.getPointerPosition", "pointermove", "containerPoint"],
  docs: ["repo/src/dom/DomUtil.js", "repo/src/dom/DomEvent.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
