// leafer-ui example: Pen: setStyle then draw
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Pen: setStyle then draw",
  summary:
    "new Pen() works like a hand: setStyle({ fill, windingRule }) starts a sub-path, then roundRect().arc() draws it; a second setStyle starts another path with its own fill and x, y.",
  section: "Elements",
  tags: ['Pen', 'setStyle', 'roundRect', 'arc', 'windingRule'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/Pen.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
