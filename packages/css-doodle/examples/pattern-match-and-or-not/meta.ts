// match: tests combine with and, or and not
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "match: tests combine with and, or and not",
  summary: "Tests combine with and, or and not, so match(a or b) runs where either holds. The variants light a centered square with and, a frame with or, and the cells off every fourth line with not.",
  section: "Patterns",
  tags: ["@pattern", "match", "and", "or", "not"],
  docs: ['pages/css-doodle-com/reference/function-pattern.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
