// marked example: Indented code inside a list
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Indented code inside a list",
  summary:
    "The docs wanted code blocks inside list items. Today Marked follows CommonMark: right after 'hello' the indented line just continues the sentence, the same as markdown.pl. Pick 'With a blank line' and it becomes a real code block inside the item.",
  section: 'Markdown is broken',
  tags: ["indented code", "lists", "CommonMark"],
  docs: ["repo/docs/broken.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
