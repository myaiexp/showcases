// Call shorthands: no parentheses without arguments, digits after the name as an argument
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Optional parentheses and a number after the name',
  summary:
    "Two spellings of the same doodle. A number stuck to a function's name becomes its first argument, so @r360 is @r(360) and @r.5 is @r(.5), and a function without arguments needs no parentheses. One catch shows up here: @r90deg is read as one name, so that cell rotation is lost, while @r(90)deg keeps the unit.",
  section: 'Syntax overview',
  tags: ["@r", "shorthand", "arguments", "units"],
  docs: ["pages/css-doodle-com/syntax-overview.md", "repo/docs/grammar.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
