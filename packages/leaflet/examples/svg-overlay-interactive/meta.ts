// leaflet example: Interactive SVG overlay
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Interactive SVG overlay",
  summary:
    "An interactive SVGOverlay: its click event fires for clicks on the SVG, and the event's target is the clicked <rect>, which the example recolours with plain DOM calls. getElement() returns the <svg>.",
  section: "Image, video & SVG overlays",
  tags: ["SVGOverlay", "interactive", "getElement", "click"],
  docs: ["repo/src/layer/SVGOverlay.js", "repo/src/layer/ImageOverlay.js", "repo/docs/examples/overlays/index.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
