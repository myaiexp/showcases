// echarts example: Bar race
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bar race',
  summary:
    'A dynamic sorting bar chart: realtimeSort reorders the bars as random growth is added every two seconds, and the labels count up with valueAnimation.',
  section: 'Bar',
  tags: ['bar', 'realtimeSort', 'yAxis.inverse', 'yAxis.max', 'valueAnimation', 'animationDurationUpdate'],
  docs: ['repo/contents/en/how-to/chart-types/bar/bar-race.md', 'repo/en/option/series/bar.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
