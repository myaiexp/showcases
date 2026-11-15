// vega example: Text: Line Breaks, Limit and Ellipsis
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Text: Line Breaks, Limit and Ellipsis",
  summary:
    "Three labels in three ways: a string split on a line-break character, an array of lines at a chosen line height, and a long sentence cut by a pixel limit. Right-to-left direction truncates the start instead.",
  section: "Mark Types",
  tags: ['marks.text.lineBreak','marks.text.lineHeight','marks.text.limit','marks.text.ellipsis','marks.text.dir'],
  docs: ['repo/docs/docs/marks/text.md', 'repo/docs/docs/marks/text.vg.json'],
  provenance: 'pure',
  added: '2026-11-15',
});
