// @pn.mirror repeats a list backwards
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Mirror: a list and its reverse",
  summary: "@mirror(a, b, c) is a, b, c, c, b, a. With @pn each of the six cells takes the next color, so the row reads black, pink, yellow and then back again, with the last color doubled.",
  section: "Values",
  tags: ["@mirror","@pn"],
  docs: ["pages/css-doodle-com/reference/function-mirror.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
