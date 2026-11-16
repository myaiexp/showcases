// fabric example: Clip paths: Absolutely positioned clip paths
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Clip paths: Absolutely positioned clip paths',
  summary:
    "With absolutePositioned set, a clip path is measured on the canvas instead of from its object: the picture moves but the window stays, and only that picture shows inside it.",
  section: 'Clip paths',
  tags: ['clipPath', 'absolutePositioned', 'FabricImage', 'Rect'],
  docs: ['repo/src/content/docs/docs/Old docs/clippath-part4.mdx', 'repo/src/content/docs/docs/Old docs/clippath-part4.jsx', 'repo/src/content/docs/api/classes/FabricImage.md', 'repo/src/content/docs/api/classes/Rect.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
