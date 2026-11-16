// leafer-ui example: Coordinates: a pen tool on a zoomed view
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Coordinates: a pen tool on a zoomed view",
  summary:
    "e.getPagePoint() turns a pointer event into page coordinates, so a line drawn with a Pen lands under the cursor however the view is zoomed or panned. The card draws, zooms and draws again.",
  section: "Advanced",
  tags: ['Leafer', 'DragEvent', 'getPagePoint', 'Pen', 'type', 'design', '@leafer-in/viewport'],
  docs: ['pages/www-leaferjs-com/ui/en/guide/advanced/coordinate.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
