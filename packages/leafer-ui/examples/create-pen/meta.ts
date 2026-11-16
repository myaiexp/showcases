// leafer-ui example: Create Pen: styled paths with canvas calls
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Create Pen: styled paths with canvas calls",
  summary:
    "Pen draws like the Canvas 2D context: setStyle() picks the paint, then roundRect() and arc() add sub-paths. Two styles make a red shape with a hole and a yellow dot.",
  section: "Basics",
  tags: ['Pen', 'setStyle', 'roundRect', 'arc', 'windingRule'],
  docs: ['pages/www-leaferjs-com/ui/en/guide/basic/display.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
