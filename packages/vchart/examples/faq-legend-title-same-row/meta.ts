// vchart example: FAQ: title and legend on one row
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: title and legend on one row",
  summary:
    "Setting layoutType absolute on the title and the legend lets them be placed with left, right and bottom distances, so a note sits at the bottom left and the legend at the bottom right of the same row.",
  section: 'FAQ',
  tags: ["layoutType","absolute","title","legends","padding"],
  docs: [
    "repo/docs/assets/faq/en/75-How to display the legend title and legend with left-right separation in the same row.md",
    "repo/docs/assets/option/en/common/layout-item.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
