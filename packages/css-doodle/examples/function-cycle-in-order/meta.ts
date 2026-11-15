// @pn.cycle walks the rotations in order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Cycle: stepping through the rotations",
  summary: "@pn.cycle(1 2 3 4) lists every rotation of 1 2 3 4, and @pn gives each of the four cells the next one, so the text shifts by one place from row to row. Switching to commas makes the rotations comma-separated lists.",
  section: "Values",
  tags: ["@cycle","@pn","@content"],
  docs: ["pages/css-doodle-com/reference/function-cycle.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
