// $ink and $n read custom properties by name
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dollar: $name passes a property through",
  summary: "Without parentheses $name is the custom property --name. An arithmetic value is worked out (--n: @i * @i shows as a square) and anything else, such as a random color, passes through as written, so each cell colors itself and prints its square.",
  section: "Values",
  tags: ["$name","--ink","@p","@content"],
  docs: ["pages/css-doodle-com/reference/function-dollar.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
