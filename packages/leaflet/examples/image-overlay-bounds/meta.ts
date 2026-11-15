// leaflet example: Moving an image overlay with setBounds
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Moving an image overlay with setBounds",
  summary:
    "setBounds moves and resizes an existing ImageOverlay: buttons shift, squash and double the Newark map, and an outline rectangle shows the bounds that getBounds returns.",
  section: "Image, video & SVG overlays",
  tags: ["ImageOverlay", "setBounds", "getBounds", "Rectangle"],
  docs: ["repo/src/layer/ImageOverlay.js", "repo/docs/examples/overlays/index.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
