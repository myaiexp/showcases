// globe-gl example: Layout: width and height
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layout: width and height",
  summary:
    "width() and height() size the canvas in pixels and read it back when called with no argument. The sliders resize it; the globe keeps its centre and its size follows the height. The canvas has a lighter background so its edges show.",
  section: "Container Layout",
  tags: ["width", "height", "backgroundColor"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
