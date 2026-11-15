// --fill(c, r): { ... } pastes a block of properties
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Define: several declarations at once",
  summary: "A body in braces can hold several declarations, pasted where the function is called. $fill(#000, 50%) sets the background and the radius together; @even and @odd call it with different arguments.",
  section: "Values",
  tags: ["--name()","$name()","@even","@odd"],
  docs: ["pages/css-doodle-com/reference/function-define.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
