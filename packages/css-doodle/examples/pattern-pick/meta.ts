// pick(k: a, b, …): item k from 1, wrapping around
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "pick(k: a, b, …): item k from 1, wrapping around",
  summary: "pick(k: a, b, …) takes item k from the list, counting from 1 and wrapping round. Using x + y plus a rising number as k gives diagonal stripes in three colors that slide.",
  section: "Patterns",
  tags: ["@pattern", "pick", "floor", "t"],
  docs: ['pages/css-doodle-com/reference/function-pattern.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
