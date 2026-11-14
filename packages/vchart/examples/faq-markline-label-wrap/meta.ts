// vchart example: FAQ: markLine label on several lines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: markLine label on several lines",
  summary:
    "markLine.label.text takes an array, and each element is its own line, so a long label can be broken by hand. A select compares one string with an array.",
  section: 'FAQ',
  tags: ["markLine.label.text","markLine"],
  docs: [
    "repo/docs/assets/faq/en/13-How does the label of the auxiliary line automatically change lines.md",
    "repo/docs/assets/option/en/component/mark-line.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
