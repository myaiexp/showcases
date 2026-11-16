// fabric example: Clip paths: Clipping the whole canvas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Clip paths: Clipping the whole canvas',
  summary:
    "canvas.clipPath clips everything the canvas draws, with the same shapes an object clip accepts. The clip lives in the scene plane, so zooming the canvas scales it, while objects move freely underneath.",
  section: 'Clip paths',
  tags: ['clipPath', 'Canvas', 'zoomToPoint', 'viewportTransform'],
  docs: ['repo/src/content/docs/docs/Old docs/clippath-part3.mdx', 'repo/src/content/docs/docs/Old docs/clippath-part3.jsx', 'repo/src/content/docs/api/classes/StaticCanvas.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
