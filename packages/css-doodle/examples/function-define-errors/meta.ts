// Missing arguments and recursion produce warnings
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Define: mistakes are reported",
  summary: "A call that leaves a parameter with no argument and no default, or a function that calls itself, is reported as a warning (see the list under the editor in the full view) and the call expands to nothing. The valid variant draws normally.",
  section: "Values",
  tags: ["--name()","$name()","warn"],
  docs: ["pages/css-doodle-com/reference/function-define.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
