// fabric example: Clip paths: Animating a clip path
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Clip paths: Animating a clip path',
  summary:
    "A clip path is animated like any object, here with clipPath.animate() on left and top with chained onComplete callbacks. Animating canvas.clipPath only repaints the canvas.",
  section: 'Clip paths',
  tags: ['clipPath', 'animate', 'onChange', 'onComplete', 'controlsAboveOverlay'],
  docs: ['repo/src/content/docs/docs/Old docs/clippath-part3.mdx', 'repo/src/content/docs/docs/Old docs/clippath-part3.jsx', 'repo/src/content/docs/api/classes/FabricObject.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
