// echarts example: Parallel category axes with smooth lines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Parallel category axes with smooth lines',
  summary:
    'Parallel coordinates mixing category axes (team, work mode) with value axes, and series.smooth from straight to fully curved. Invert the category axes and brush with realtime off.',
  section: 'Option: series.parallel',
  tags: ['parallel', 'parallelAxis', 'category', 'smooth', 'inverse', 'realtime', 'inactiveOpacity'],
  docs: [
    'repo/en/option/series/parallel.md',
    'repo/en/option/component/parallel.md',
    'repo/en/option/component/parallel-axis.md',
    'repo/en/option/partial/parallel.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
