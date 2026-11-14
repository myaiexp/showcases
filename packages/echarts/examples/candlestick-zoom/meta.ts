// echarts example: Candlestick with dataZoom
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Candlestick with dataZoom",
  summary:
    "A candlestick series of generated OHLC data with a slider and inside dataZoom. The preview slides the window along the data.",
  section: 'Option: series.candlestick',
  tags: ['candlestick', 'dataZoom', 'itemStyle.color0', 'axisPointer'],
  docs: [
    'repo/en/option/series/candlestick.md',
    'repo/en/option/component/data-zoom.md',
    'repo/en/option/component/data-zoom-slider.md',
    'repo/en/option/component/data-zoom-inside.md',
    'repo/en/option/component/tooltip.md',
    'repo/en/option/partial/tooltip-common.md',
    'repo/en/option/partial/axisPointer-common.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
