// echarts example: Async loading and live data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Async loading and live data',
  summary:
    'Empty titled axes first, showLoading while a request is out, data merged in by series name when it arrives, then a point pushed every second for a sliding live line.',
  section: 'Data',
  tags: ['showLoading', 'hideLoading', 'setOption', 'series name', 'dynamic update'],
  docs: ['repo/contents/en/how-to/data/dynamic-data.md', 'repo/en/api/echarts-instance.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
