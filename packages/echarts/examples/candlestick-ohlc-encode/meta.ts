// echarts example: Candlestick OHLC encode and bar width
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Candlestick OHLC encode and bar width',
  summary:
    'Rows arrive as [date, open, high, low, close] and encode.y [1, 4, 3, 2] maps them onto the OCLH order candlestick expects. Turn the remap off to see the wrong reading, and limit the candle width with barWidth, barMinWidth and barMaxWidth.',
  section: 'Option: series.candlestick',
  tags: ['candlestick', 'encode', 'dataset', 'barWidth', 'barMinWidth', 'barMaxWidth'],
  docs: ['repo/en/option/series/candlestick.md', 'repo/en/option/component/dataset.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
