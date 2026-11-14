// marked example: Blockquotes split by blank lines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Blockquotes split by blank lines",
  summary:
    "Three quoted lines with blank lines between them. The markdown.js output the docs quote merges them and leaks the word 'undefined'; Marked renders three separate blockquotes, one box each.",
  section: 'Markdown is broken',
  tags: ["blockquote", "markdown.js"],
  docs: ["repo/docs/broken.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
