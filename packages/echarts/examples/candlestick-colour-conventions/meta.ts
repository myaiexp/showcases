// echarts example: Candlestick colour conventions and doji
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Candlestick colour conventions and doji',
  summary:
    'The five itemStyle colours that decide how a candle reads: color and color0 for rising and falling bodies, their borders, and borderColorDoji for days that close at the open. Switch between regional conventions and a hollow style.',
  section: 'Option: series.candlestick',
  tags: ['candlestick', 'itemStyle', 'color', 'color0', 'borderColor', 'borderColor0', 'borderColorDoji', 'borderWidth'],
  docs: ['repo/en/option/series/candlestick.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
