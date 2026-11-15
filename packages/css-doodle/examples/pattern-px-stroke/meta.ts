// px: a stroke that stays two pixels wide at any size
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "px: a stroke that stays two pixels wide at any size",
  summary: "Widths are in the units of pos, so a stroke grows with the image. px is one CSS pixel in those units, so shape(abs(d), 2px) stays two pixels wide. The same code runs in a small and a larger box, once with width .02 in pos units and once with 2px.",
  section: "Patterns",
  tags: ["@pattern", "px", "shape", "frame"],
  docs: ['pages/css-doodle-com/reference/function-pattern.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
