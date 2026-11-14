// marked example: A loose nested list
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A loose nested list",
  summary:
    "Blank lines inside a nested list decide what belongs where. Marked's default keeps 'are you' as a second paragraph of the 'world' item; pedantic: true ends the inner list and puts it under 'hello', matching the markdown.pl output the docs quote.",
  section: 'Markdown is broken',
  tags: ["pedantic", "loose lists", "paragraphs"],
  docs: ["repo/docs/broken.md", "repo/docs/USING_ADVANCED.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
