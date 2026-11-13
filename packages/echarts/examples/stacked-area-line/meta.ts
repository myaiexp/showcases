// echarts example: Stacked area line chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stacked area line chart',
  summary:
    'Five line series sharing a stack name, with areaStyle filling beneath each line. Toggle stack and areaStyle independently to see why the handbook recommends filling stacked lines.',
  section: 'Line',
  tags: ['line', 'stack', 'areaStyle', 'boundaryGap', 'emphasis.focus', 'axisPointer'],
  docs: [
    'repo/contents/en/how-to/chart-types/line/stacked-line.md',
    'repo/contents/en/how-to/chart-types/line/area-line.md',
    'repo/en/option/series/line.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
