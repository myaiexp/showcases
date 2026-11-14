// marked example: Block HTML and inline HTML
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Block HTML and inline HTML",
  summary:
    "Markdown lets you mix in HTML. The markdown.js output the docs quote turns the tags into visible text; Marked keeps the <div> as its own block and puts the inline <span> inside a paragraph, which the outlines make visible.",
  section: 'Markdown is broken',
  tags: ["HTML blocks", "inline HTML", "markdown.js"],
  docs: ["repo/docs/broken.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
