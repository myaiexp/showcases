// vchart example: FAQ: fit a line's y axis to its data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: fit a line's y axis to its data",
  summary:
    "Continuous axes start at zero by default, which flattens a line that stays between 80 and 100. axes.zero: false lets the range follow the data, and tick.tickMode 'd3' picks ticks that hug the data range closely.",
  section: 'FAQ',
  tags: ['zero','tickMode','d3','linear axis'],
  docs: [
    'repo/docs/assets/faq/en/120- How to set an adaptive y-axis range in a line chart.md',
    'repo/docs/assets/faq/en/131- Can the tick range of a continuous axis be configured to closely match the data range.md',
    'repo/docs/assets/option/en/component/axis-common/base-axis.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
