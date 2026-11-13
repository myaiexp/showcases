// echarts example: Broken axis
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Broken axis',
  summary:
    'A value axis whose empty range between ordinary days and two outliers is collapsed into a torn-paper band. Click the band, or toggleAxisBreak, to expand it to the true scale.',
  section: "What's New in 6",
  tags: ['yAxis.breaks', 'breakArea', 'toggleAxisBreak', 'axisbreakchanged'],
  docs: [
    'repo/contents/en/basics/release-note/v6-feature.md',
    'repo/en/option/component/axis-common.md',
    'repo/en/api/action.md',
    'repo/en/api/events.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
