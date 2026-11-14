// echarts example: Candlesticks with a linked volume panel
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Candlesticks with a linked volume panel',
  summary:
    'A candlestick grid with a volume bar grid beneath it. One dataZoom drives both x axes and axisPointer.link keeps the hover guides in step; switch the link off, change the pointer type or resize the volume panel.',
  section: 'Option: series.candlestick',
  tags: ['candlestick', 'bar', 'grid', 'axisPointer.link', 'dataZoom.xAxisIndex', 'xAxis.gridIndex', 'tooltip'],
  docs: [
    'repo/en/option/series/candlestick.md',
    'repo/en/option/component/axisPointer.md',
    'repo/en/option/component/grid.md',
    'repo/en/option/component/data-zoom.md',
    'repo/contents/en/basics/release-note/v6-feature.md',
    'repo/en/option/component/x-axis.md',
    'repo/en/option/component/y-axis.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
