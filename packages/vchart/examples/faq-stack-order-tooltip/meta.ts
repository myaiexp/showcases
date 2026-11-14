// vchart example: FAQ: stack order against tooltip order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: stack order against tooltip order",
  summary:
    "A stacked bar and its tooltip list series in opposite orders. Three fixes: stackInverse flips the stack, updateContent reverses the tooltip lines, and data.fields domain with sortIndex fixes the order of the group field itself.",
  section: 'FAQ',
  tags: ["stackInverse","tooltip.dimension.updateContent","data.fields","domain","sortIndex"],
  docs: [
    "repo/docs/assets/faq/en/21- How to adjust the display order of contents in the Tooltip of a VChart stacked bar chart.md",
    "repo/docs/assets/faq/en/45-How to control the display order of stacking and legends and add display of total information on the tooltip.md",
    "repo/docs/assets/option/en/component/tooltip.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
