// @pn.reverse hands out a list in reverse
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Reverse: a list backwards",
  summary: "@reverse(a, b, c) is c, b, a, so @pn.reverse over five greys makes the row run from light to dark although the list was written dark to light.",
  section: "Values",
  tags: ["@reverse","@pn"],
  docs: ["pages/css-doodle-com/reference/function-reverse.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
