// vega example: Symbol: Custom Path Shapes Sized by Data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Symbol: Custom Path Shapes Sized by Data",
  summary:
    "Each category brings its own SVG path as its symbol shape, drawn in a square from -1 to 1 so size works as usual. Size encodes a value through a sqrt scale, and a growth signal swells them all.",
  section: "Mark Types",
  tags: ['marks.symbol.shape','marks.symbol.size','scale.sqrt'],
  docs: ['repo/docs/docs/marks/symbol.md', 'repo/docs/docs/marks/symbol.vg.json'],
  provenance: 'pure',
  added: '2026-11-15',
});
