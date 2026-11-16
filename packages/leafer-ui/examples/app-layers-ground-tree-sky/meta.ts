// leafer-ui example: App: ground, tree and sky
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "App: ground, tree and sky",
  summary:
    "App's three named layers: ground below (a grid here), tree for the content (draggable squares) and sky on top (a ring that follows the pointer). Each is its own Leafer canvas, so the ground is painted once and the sky repaints cheaply.",
  section: "Advanced",
  tags: ['App', 'ground', 'tree', 'sky', 'Leafer', 'PointerEvent'],
  docs: ['pages/www-leaferjs-com/ui/en/guide/advanced/app.md', 'pages/www-leaferjs-com/ui/en/reference/display/App.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
