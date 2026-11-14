// marked example: A quote inside a list item
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A quote inside a list item",
  summary:
    "A bullet with a quote under it. The docs quote markdown.pl's output, whose tags overlap so the browser repairs them into a mess; Marked's output is a clean list item holding a blockquote, as the outlined boxes show.",
  section: 'Markdown is broken',
  tags: ["blockquote", "lists", "markdown.pl"],
  docs: ["repo/docs/broken.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
