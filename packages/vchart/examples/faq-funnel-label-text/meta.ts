// vchart example: FAQ: custom funnel label text
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: custom funnel label text",
  summary:
    "label.style.text is a callback over the datum, and an array returned from it gives a two-line label; outerLabel.style.text does the same for the label on the right. A select compares them with the defaults.",
  section: 'FAQ',
  tags: ["funnel","label.style.text","outerLabel","transformLabel"],
  docs: [
    "repo/docs/assets/faq/en/77-How to customize the display text content of the funnel chart.md",
    "repo/docs/assets/option/en/series/funnel.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
