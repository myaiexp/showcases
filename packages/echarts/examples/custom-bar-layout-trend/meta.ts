// echarts example: Trend arrows over bars with api.barLayout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Trend arrows over bars with api.barLayout',
  summary:
    'Two grouped bar series and a custom series on top. renderItem calls api.barLayout to find where each bar of a pair sits, then draws an arrow and a percentage change between their tops. Change barWidth and barGap and the arrows follow the bars.',
  section: 'Option: series.custom',
  tags: ['custom', 'renderItem', 'api.barLayout', 'offsetCenter', 'barWidth', 'barGap', 'barCategoryGap', 'api.font'],
  docs: ['repo/en/option/series/custom.md', 'repo/en/option/partial/zr-graphic.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
