// @sin(30deg) is 0; radians(30) is the fix
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Math: units make an argument zero",
  summary: "A unit makes an argument 0, so @sin(30deg) prints 0. Writing @sin(radians(30)) gives .5, and $(sin(30deg)) reads deg as an angle and gives .5 as well. The cells show the three results.",
  section: "Values",
  tags: ["@sin","radians","$()","@content"],
  docs: ["pages/css-doodle-com/reference/function-math.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
