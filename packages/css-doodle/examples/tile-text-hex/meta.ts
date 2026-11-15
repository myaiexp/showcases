// css-doodle example: Hexagons filling a letter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Hexagons filling a letter",
  summary:
    "@tile.hex(text: O; gap: 1) fills a letter with hexagons, since the shape can be drawn by any @shape command including text. The letter's hole stays empty.",
  section: 'Shapes',
  tags: ['@tile', 'text', '@tile.hex', 'font'],
  docs: ['pages/css-doodle-com/reference/function-tile.md', 'pages/css-doodle-com/reference/function-shape.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
