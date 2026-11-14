// playcanvas example: DOM overlay
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'DOM overlay',
  summary:
    "On a phone, an AR session can show plain HTML and CSS over the camera view. The element is handed to app.xr.domOverlay.root before the session starts; its buttons keep working as usual, and a beforexrselect handler stops a tap on them from also selecting something in the 3D scene. The bar over the canvas is that overlay: it adds and clears cubes outside XR too, and the readout shows domOverlay.supported and available.",
  section: 'XR',
  tags: ['XrDomOverlay', 'domOverlay.root', 'supported', 'available', 'beforexrselect'],
  docs: ['repo/docs/user-manual/xr/ar/dom-overlay.md', 'repo/docs/user-manual/xr/ar/index.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
