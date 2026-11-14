// g6 example: Timebar: time mode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Timebar: time mode',
  summary: 'The timebar plugin filters nodes by a time range. Time mode draws a slider over the days; nodes read their time from data.timestamp. The card plays the bar in a loop.',
  section: 'Plugin',
  tags: ['timebar', 'timebarType', 'data', 'play', 'loop'],
  docs: ['repo/packages/site/docs/manual/plugin/Timebar.en.md', 'repo/packages/site/common/api/plugins/timebar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
