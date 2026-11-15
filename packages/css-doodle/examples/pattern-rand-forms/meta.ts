// rand(), rand(p), rand(p, k) and rand(p + 1)
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "rand(), rand(p), rand(p, k) and rand(p + 1)",
  summary: "rand() is a different number in each cell and at each place it is written; rand(p) is the same for the same point; rand(p, k) gives another number for each k; and adding to the point reads another cell's number. The cards cycle the forms and redraw with a new seed.",
  section: "Patterns",
  tags: ["@pattern", "rand", "grid"],
  docs: ['pages/css-doodle-com/reference/function-pattern.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
