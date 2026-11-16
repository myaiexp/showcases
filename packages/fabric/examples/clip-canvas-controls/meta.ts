// fabric example: Clip paths: Controls above the canvas clip
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Clip paths: Controls above the canvas clip',
  summary:
    "A canvas clipPath clips the selection controls too. Setting canvas.controlsAboveOverlay to true draws them over the clip so the handles stay reachable.",
  section: 'Clip paths',
  tags: ['clipPath', 'controlsAboveOverlay', 'Canvas'],
  docs: ['repo/src/content/docs/docs/Old docs/clippath-part3.mdx', 'repo/src/content/docs/docs/Old docs/clippath-part3.jsx', 'repo/src/content/docs/api/classes/Canvas.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
