// echarts example: Container size and resize()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Container size and resize()',
  summary:
    'Change the container width and call resize() to refit the chart, or pass explicit width and height to make the chart a different size than its container. The animation option adds a transition.',
  section: 'Concepts',
  tags: ['resize', 'echarts.init', 'ResizeObserver', 'getWidth', 'getHeight'],
  docs: ['repo/contents/en/concepts/chart-size.md', 'repo/en/api/echarts-instance.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
