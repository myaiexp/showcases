// leaflet example: BlanketOverlay: one canvas over the map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "BlanketOverlay: one canvas over the map",
  summary:
    `BlanketOverlay is the base of Leaflet's renderers: one HTML element that covers the map, extended past the view by a padding fraction, and positioned for you. This subclass fills _initContainer with a canvas, resizes it in _resizeContainer and draws a dot grid in _onSettled, which runs when the map settles (or on every move with continuous). The tint is the canvas itself, so the padding is visible once you pan; the log counts the draws.`,
  section: "Extending Leaflet",
  tags: ["BlanketOverlay", "padding", "continuous", "_initContainer", "_resizeContainer", "_onSettled", "DomUtil.create"],
  docs: ["repo/src/layer/BlanketOverlay.js", "repo/src/dom/DomUtil.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
