// leafer-ui example: Canvas: safeResize
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Canvas: safeResize",
  summary:
    "Resizing a Canvas clears it, unless safeResize: true keeps the earlier content (a bit slower). The width slides while a circle is drawn once.",
  section: "Elements",
  tags: ['Canvas', 'safeResize', 'width', 'context'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/Canvas.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
