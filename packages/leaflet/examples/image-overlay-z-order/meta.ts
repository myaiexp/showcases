// leaflet example: Overlay stacking order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Overlay stacking order",
  summary:
    "Two overlapping image overlays, the Newark map and a blue panel, reordered with bringToFront, bringToBack and setZIndex. A readout shows each overlay's zIndex option.",
  section: "Image, video & SVG overlays",
  tags: ["ImageOverlay", "bringToFront", "bringToBack", "setZIndex", "zIndex"],
  docs: ["repo/src/layer/ImageOverlay.js", "repo/docs/examples/overlays/index.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
