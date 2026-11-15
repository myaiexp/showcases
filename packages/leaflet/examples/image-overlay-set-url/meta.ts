// leaflet example: Swapping an overlay's image with setUrl
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Swapping an overlay's image with setUrl",
  summary:
    "setUrl changes the picture of an ImageOverlay while its bounds stay: buttons switch between the 1922 Newark map and a survey grid drawn on a canvas. The overlay fires load for each new image.",
  section: "Image, video & SVG overlays",
  tags: ["ImageOverlay", "setUrl", "load"],
  docs: ["repo/src/layer/ImageOverlay.js", "repo/docs/examples/overlays/index.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
