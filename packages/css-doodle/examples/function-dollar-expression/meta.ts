// $(@i * 2) works out an expression to a number
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dollar: arithmetic in a cell",
  summary: "$( ) evaluates an arithmetic expression after the @ functions inside it. Here each cell shows twice its index. The variants try the other operators: remainder, power and a comparison.",
  section: "Values",
  tags: ["$()","@i","@content"],
  docs: ["pages/css-doodle-com/reference/function-dollar.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
