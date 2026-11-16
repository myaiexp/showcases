// leafer-ui example: Coordinates: drop DOM shapes onto the tree
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Coordinates: drop DOM shapes onto the tree",
  summary:
    "A DOM element dragged onto the canvas gives browser client coordinates; app.getPagePointByClient() converts them to page coordinates, so the new shape lands where it was dropped even on a zoomed view.",
  section: "Advanced",
  tags: ['App', 'getPagePointByClient', 'Rect.one', 'Ellipse.one', 'drop', '@leafer-in/editor'],
  docs: ['pages/www-leaferjs-com/ui/en/guide/advanced/coordinate.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
