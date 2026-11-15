// vega example: Countpattern: Words and Stopwords
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Countpattern: Words and Stopwords",
  summary:
    "Word frequencies in four lines of text. Lowercasing merges The and the, and a stopwords regular expression drops the filler words, so the ranking changes as the controls cycle.",
  section: 'Transforms: Basic',
  tags: ["transform.countpattern.case", "transform.countpattern.stopwords", "transform.countpattern.as", "transform.collect.sort"],
  docs: ["repo/docs/docs/transforms/countpattern.md", "repo/docs/docs/transforms/collect.md", "repo/docs/docs/transforms/window.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
