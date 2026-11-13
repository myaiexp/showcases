// echarts example: dataZoom on the y axis with spans and lock
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'dataZoom on the y axis with spans and lock',
  summary:
    'A vertical slider and an inside zoom window the categories of a long horizontal bar chart. Change minSpan and maxSpan, lock the window size, or jump to a window by startValue and endValue.',
  section: 'Option: Components',
  tags: ['dataZoom', 'yAxisIndex', 'minSpan', 'maxSpan', 'zoomLock', 'startValue', 'endValue'],
  docs: [
    'repo/en/option/component/data-zoom.md',
    'repo/en/option/component/data-zoom-slider.md',
    'repo/en/option/component/data-zoom-inside.md',
    'repo/en/api/action.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
