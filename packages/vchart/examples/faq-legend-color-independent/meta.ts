// vchart example: FAQ: legend colours independent of the chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: legend colours independent of the chart",
  summary:
    "A legend marker normally takes the slice colour. legends.item.shape.style overrides every marker at once, while the legends.data callback rewrites the shape of each item: its own symbol and a border.",
  section: 'FAQ',
  tags: ["legends.item.shape","legends.data","fill","stroke"],
  docs: [
    "repo/docs/assets/faq/en/10- How to change the color of the legend.md",
    "repo/docs/assets/faq/en/44-How to customize the image and color of a legend.md",
    "repo/docs/assets/option/en/component/legend-discrete.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
