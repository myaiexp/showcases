// leaflet example: Image overlay
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Image overlay",
  summary:
    "A 1922 map of Newark, N.J. laid over the tiles with ImageOverlay, positioned by a LatLngBounds, at opacity 0.8 with alt text. fitBounds zooms to it; the card zooms in and out to show it scales with the map.",
  section: "Image, video & SVG overlays",
  tags: ["ImageOverlay", "LatLngBounds", "fitBounds", "opacity", "alt"],
  docs: ["repo/src/layer/ImageOverlay.js", "repo/docs/examples/overlays/index.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
