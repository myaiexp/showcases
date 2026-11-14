// vchart example: FAQ: pie labels on several lines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: pie labels on several lines",
  summary:
    "label.formatMethod may return an array of strings, one per line: the category on the first line, the value, or a percentage, on the next. The select picks one, two or three lines.",
  section: 'FAQ',
  tags: ['label.formatMethod','multi-line','pie'],
  docs: [
    'repo/docs/assets/faq/en/152- How to display labels on multiple lines.md',
    'repo/docs/assets/option/en/component/label.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
