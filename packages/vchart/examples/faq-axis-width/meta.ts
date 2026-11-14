// vchart example: FAQ: axis width for long labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: axis width for long labels",
  summary:
    "axes[i].width reserves a fixed pixel width or a percentage for the axis component, so long band labels on a horizontal bar chart are not truncated so hard. A select tries four widths.",
  section: 'FAQ',
  tags: ["axes.width","band axis","horizontal bar"],
  docs: [
    "repo/docs/assets/faq/en/67- How to set the axis width in VChart.md",
    "repo/docs/assets/option/en/component/cartesian-axis.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
