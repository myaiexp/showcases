// size and t: cells that breathe, and an image size with @pattern800
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "size and t: cells that breathe, and an image size with @pattern800",
  summary: "size scales the mask from 0 to 1, and reading the time t animates the pattern. size: sin(4*log(dr) - 2t - da) turns the grid into a spiral of growing and shrinking black squares; the digits in @pattern800 set the image size in pixels.",
  section: "Patterns",
  tags: ["@pattern", "size", "t", "dr", "da"],
  docs: ['pages/css-doodle-com/reference/function-pattern.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
