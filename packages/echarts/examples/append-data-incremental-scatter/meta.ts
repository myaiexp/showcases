// echarts example: Incremental scatter with appendData
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Incremental scatter with appendData',
  summary:
    'A scatter series that starts empty and grows by chunked appendData calls, drawing only the new points each time instead of rebuilding the whole set. Change the chunk size, then reset to start again.',
  section: 'Data',
  tags: ['appendData', 'scatter', 'progressive', 'large data', 'setOption'],
  docs: ['repo/en/api/echarts-instance.md', 'repo/en/option/series/scatter.md', 'repo/en/option/partial/progressive.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
