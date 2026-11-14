// marked example: Code under a deep list
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Code under a deep list",
  summary:
    "The docs complain that markdown.pl flattens the third bullet and never treats the indented line as code. The boxes show Marked's default nesting three lists deep, and pedantic: true putting 'hi' beside 'world' instead.",
  section: 'Markdown is broken',
  tags: ["pedantic", "nested lists"],
  docs: ["repo/docs/broken.md", "repo/docs/USING_ADVANCED.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
