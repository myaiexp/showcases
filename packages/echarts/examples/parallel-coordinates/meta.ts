// echarts example: Parallel coordinates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Parallel coordinates",
  summary:
    "A parallel component with five parallelAxis entries (value and category) and a parallel series. Drag an axis to select a range.",
  section: 'Option: series.parallel',
  tags: ['parallel', 'parallelAxis', 'dim', 'areaSelectStyle', 'visualMap', 'inactiveOpacity'],
  docs: [
    'repo/en/option/series/parallel.md',
    'repo/en/option/component/parallel.md',
    'repo/en/option/component/parallel-axis.md',
    'repo/en/option/component/visual-map.md',
    'repo/en/option/component/visual-map-continuous.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
