// vchart example: interactions: highlight and active by legend
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "interactions: highlight and active by legend",
  summary:
    "element-highlight-by-legend and element-active-by-legend tie a line's state to the legend item under the pointer. filterType groupKey matches the legend key to the series, and markNames limits which marks take the state.",
  section: "Option: Common",
  tags: ["interactions","element-highlight-by-legend","element-active-by-legend","filterType","markNames","groupKey"],
  docs: [
    'repo/docs/assets/option/en/common/interaction.md',
    'repo/docs/assets/option/en/common/element-active-trigger.md',
    'repo/docs/assets/option/en/common/mark-state-style.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
