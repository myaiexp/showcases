// leafer-ui example: Canvas: draw with context
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Canvas: draw with context",
  summary:
    "new Canvas({ width, height }) is an element with a 2D context: draw with canvas.context, then canvas.paint() to render. The card redraws the circle radius every frame and paints.",
  section: "Elements",
  tags: ['Canvas', 'context', 'paint', 'width', 'height'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/Canvas.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
