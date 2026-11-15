// leaflet example: Image overlay opacity
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Image overlay opacity",
  summary:
    "The Newark 1922 overlay with a slider calling setOpacity from 1 down to 0, so the terrain tiles beneath show through. The card sweeps the value by itself.",
  section: "Image, video & SVG overlays",
  tags: ["ImageOverlay", "setOpacity", "opacity"],
  docs: ["repo/src/layer/ImageOverlay.js", "repo/docs/examples/overlays/index.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
