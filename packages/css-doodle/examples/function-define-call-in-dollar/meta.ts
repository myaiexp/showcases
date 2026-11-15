// $(2 * $inc(3)) is 8, and inc(3) works too
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Define: one value inside $()",
  summary: "Inside $() a call is one value: with --inc(x): x + 1, $(2 * $inc(3)) is 8. There the $ can be left out, so $(2 * inc(3)) is 8 as well. The two columns show both spellings.",
  section: "Values",
  tags: ["--name()","$name()","$()","@content"],
  docs: ["pages/css-doodle-com/reference/function-define.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
