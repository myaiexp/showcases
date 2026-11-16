// leafer-ui example: Bounds: box, render, world and layout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Bounds: box, render, world and layout",
  summary:
    "A rotated Rect with a stroke and a shadow has several boxes: boxBounds (its own size), renderBounds (with stroke and shadow), worldBoxBounds and worldRenderBounds (axis-aligned in world space) and the layout corners of the rotated box. Toggle each.",
  section: "Advanced",
  tags: ['Rect', 'boxBounds', 'renderBounds', 'worldBoxBounds', 'worldRenderBounds', 'getLayoutPoints', 'getBounds', 'rotation'],
  docs: ['pages/www-leaferjs-com/ui/en/guide/advanced/bounds.md', 'pages/www-leaferjs-com/ui/en/guide/basic/style.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
