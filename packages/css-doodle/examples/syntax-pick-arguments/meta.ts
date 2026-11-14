// Pick-function arguments: ranges, @pick(index: ...), xN copies, custom property lists
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Arguments of pick functions',
  summary:
    'Four rules for the arguments of @p and friends: [a-z] expands to a list, a colon after the first argument of @pick makes it an index (@pick(@i: a, b) alternates), "x3" counts an argument three times, and an argument that names a custom property (--c) reads its list.',
  section: 'Syntax overview',
  tags: ["@p", "@pick", "[a-z]", "x3", "--name", "arguments"],
  docs: ["pages/css-doodle-com/syntax-overview.md", "repo/docs/grammar.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
