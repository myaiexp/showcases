// echarts example: setOption merge modes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'setOption: merge, notMerge, replaceMerge, lazyUpdate, silent',
  summary:
    'The same partial option, sent to a chart that has a title, a legend and three series, under each setOption mode. Normal merge updates one series, notMerge wipes everything else, replaceMerge on series keeps the axes but drops the other series. Set lazyUpdate and silent, and read the series count from getOption and the rendered and finished event counts.',
  section: 'API',
  tags: ['setOption', 'notMerge', 'replaceMerge', 'lazyUpdate', 'silent', 'getOption', 'series.id'],
  docs: ['repo/en/api/echarts-instance.md', 'repo/en/api/events.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
