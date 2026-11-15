// The same random hue, drawn once and drawn per cell
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Once versus every cell",
  summary: "Two grids use the same hue expression. On the left each cell draws its own hue; on the right @once draws it one time, so the cells share a hue and only differ in lightness.",
  section: "Values",
  tags: ["@once","@r","hsl"],
  docs: ["pages/css-doodle-com/reference/function-once.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
