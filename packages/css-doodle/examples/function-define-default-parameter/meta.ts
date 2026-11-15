// --dot(r, c = #000) is called as $dot(30%)
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Define: a function with a default",
  summary: "The definition emits nothing; each call is replaced by its body. $dot(30%) leaves the color out so it takes the default black, and $dot(60%, #e6437d) passes a pink. Both are layers of one background.",
  section: "Values",
  tags: ["--name()","$name()","radial-gradient"],
  docs: ["pages/css-doodle-com/reference/function-define.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
