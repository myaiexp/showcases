// vchart example: FAQ: poptip for cut-off legend labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: poptip for cut-off legend labels",
  summary:
    "When a legend label is too long it is cut with an ellipsis and hovering shows a poptip with the full text. The poptip constructor option turns that off.",
  section: 'FAQ',
  tags: ["poptip","legends.item.width","IInitOption"],
  docs: [
    "repo/docs/assets/faq/en/30-How to add prompt information to the legend.md",
    "repo/docs/assets/faq/en/96-How to display the complete information of the legend when hovering.md",
    "repo/docs/assets/faq/en/65- How to prevent displaying abbreviated tooltips when custom tooltips are already set.md",
    "repo/docs/assets/api/en/API/vchart.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
