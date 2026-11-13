// echarts example: Basic bar chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Basic bar chart',
  summary:
    'Two bar series on a category axis, styled with itemStyle and a per-item override. Adjust barWidth, barGap and the background bars, or draw new data.',
  section: 'Bar',
  tags: ['bar', 'barWidth', 'barGap', 'barCategoryGap', 'showBackground', 'backgroundStyle', 'itemStyle'],
  docs: ['repo/contents/en/how-to/chart-types/bar/basic-bar.md', 'repo/en/option/series/bar.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
