// vega example: Countpattern: Custom Patterns
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Countpattern: Custom Patterns",
  summary:
    "Four note lines scanned with a switchable pattern: digit runs, capitalised words, times or vowels. The token column is whatever the regular expression matched; a stopwords pattern skips the token 3.",
  section: 'Transforms: Basic',
  tags: ["transform.countpattern.pattern", "transform.countpattern.stopwords", "transform.countpattern.as"],
  docs: ["repo/docs/docs/transforms/countpattern.md", "repo/docs/docs/transforms/collect.md", "repo/docs/docs/transforms/window.md", "repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
