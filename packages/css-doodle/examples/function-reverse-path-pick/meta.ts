// @reverse turns path commands around
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Reverse: a path or its reverse",
  summary: "Each cell draws a staircase path, picking at random between the stored path and @reverse of it. The commands run from last to first, so the staircase steps either grow or shrink as they go.",
  section: "Values",
  tags: ["@reverse","@svg","@p"],
  docs: ["pages/css-doodle-com/reference/function-reverse.md","pages/css-doodle-com/reference/function-svg.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
