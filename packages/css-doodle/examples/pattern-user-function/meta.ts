// A user function with a result: --name(params): { … }
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A user function with a result: --name(params): { … }",
  summary: "$name(…) calls a function defined with --name(). Its parameters read bare, and a body that assigns result gives a value: noise2 mixes random corner values into smooth noise, and two calls at different scales are multiplied.",
  section: "Patterns",
  tags: ["@pattern", "--name()", "$name()", "result"],
  docs: ['pages/css-doodle-com/reference/function-pattern.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
