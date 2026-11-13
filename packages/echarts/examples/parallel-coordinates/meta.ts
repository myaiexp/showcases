// echarts example: Parallel coordinates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Parallel coordinates",
  summary:
    "A parallel component with five parallelAxis entries (value and category) and a parallel series. Drag an axis to select a range.",
  section: 'Option: Series',
  tags: ['parallel', 'parallelAxis', 'dim', 'areaSelectStyle', 'visualMap', 'inactiveOpacity'],
  docs: ['repo/en/option/series/parallel.md', 'repo/en/option/component/parallel.md', 'repo/en/option/component/parallel-axis.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
