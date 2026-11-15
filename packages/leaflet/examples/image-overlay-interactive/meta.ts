// leaflet example: Interactive image overlay
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Interactive image overlay",
  summary:
    "An ImageOverlay with interactive: true fires pointerover, pointerout and click, and can bind a popup. Hovering raises its opacity; clicking opens a popup where the click landed.",
  section: "Image, video & SVG overlays",
  tags: ["ImageOverlay", "interactive", "bindPopup", "pointerover", "click"],
  docs: ["repo/src/layer/ImageOverlay.js", "repo/docs/examples/overlays/index.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
