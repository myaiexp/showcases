// echarts example: useUTC on a time axis
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'useUTC on a time axis',
  summary:
    'An hourly series over three days on a time axis, with the root useUTC switched on or off. Ticks, axis labels and tooltip follow, and a title line formats the first timestamp with echarts.time.format in the matching mode. The two modes only differ when your time zone is not UTC.',
  section: 'Option: global',
  tags: ['useUTC', 'xAxis.type', 'time', 'echarts.time.format', 'tooltip'],
  docs: ['repo/en/option/option.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
