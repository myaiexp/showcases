// leaflet example: Image overlay error fallback
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Image overlay error fallback",
  summary:
    "An ImageOverlay whose URL is not a picture: the error event fires, and with errorOverlayUrl the overlay swaps in a stand-in image drawn on a canvas. Buttons compare a broken URL with and without the fallback, and a working one.",
  section: "Image, video & SVG overlays",
  tags: ["ImageOverlay", "errorOverlayUrl", "error", "load"],
  docs: ["repo/src/layer/ImageOverlay.js", "repo/docs/examples/overlays/index.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
