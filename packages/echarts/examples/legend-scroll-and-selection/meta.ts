// echarts example: Scroll legend and selection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scroll legend and selection',
  summary:
    'A fourteen-entry legend that scrolls in one row. Switch selectedMode, then toggle, select all, invert or scroll the legend with dispatchAction and watch legendselectchanged report the result.',
  section: 'Concepts',
  tags: ['legend', 'type: scroll', 'selectedMode', 'legendToggleSelect', 'legendAllSelect', 'legendInverseSelect', 'legendScroll', 'legendselectchanged'],
  docs: [
    'repo/contents/en/concepts/legend.md',
    'repo/en/option/component/legend.md',
    'repo/en/api/action.md',
    'repo/en/api/events.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
