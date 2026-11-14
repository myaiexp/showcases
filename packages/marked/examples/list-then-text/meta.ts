// marked example: Text after a nested list
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Text after a nested list",
  summary:
    "Is the last line part of the list or a new paragraph? The outlines show it: Marked's default rules put 'text' after the list, while pedantic: true (original markdown.pl rules) keeps it inside the first item. Indent it 4 spaces and both agree.",
  section: 'Markdown is broken',
  tags: ["pedantic", "lists", "CommonMark"],
  docs: ["repo/docs/broken.md", "repo/docs/USING_ADVANCED.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
