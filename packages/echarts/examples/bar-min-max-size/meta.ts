// echarts example: Bar minimum and maximum size
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bar minimum and maximum size',
  summary:
    'Twelve bars, several of them almost zero. Slide barMinHeight to keep tiny values visible, and barMaxWidth, barMinWidth and barWidth to see which limit wins.',
  section: 'Option: series.bar',
  tags: ['bar', 'barMinHeight', 'barMaxWidth', 'barMinWidth', 'barWidth'],
  docs: ['repo/en/option/series/bar.md', 'repo/en/option/partial/barGrid.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
