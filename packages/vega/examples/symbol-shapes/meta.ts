// vega example: Symbol: Every Shape
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Symbol: Every Shape",
  summary:
    "Thirteen built-in shapes and one custom SVG path, one symbol each. Size is the area, angle turns them, and the stroke shape draws a line segment instead of a closed outline.",
  section: "Mark Types",
  tags: ['marks.symbol.shape','marks.symbol.size','marks.symbol.angle'],
  docs: ['repo/docs/docs/marks/symbol.md', 'repo/docs/docs/marks/symbol.vg.json'],
  provenance: 'pure',
  added: '2026-11-15',
});
