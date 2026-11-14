// playcanvas example: Clearing and transparent canvases
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Clearing and transparent canvases",
  summary:
    "The camera clears its render target to clearColor before drawing, which is the scene's background. Cycling between two opaque colours and a clear colour with alpha 0 lets the striped web page behind the canvas show through.",
  section: "Graphics: Cameras",
  tags: ["clearColor","clearColorBuffer","alpha 0"],
  docs: ["repo/docs/user-manual/graphics/cameras/clearing.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
