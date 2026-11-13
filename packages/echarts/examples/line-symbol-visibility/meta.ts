// echarts example: Line symbols: showSymbol and showAllSymbol
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Line symbols: showSymbol and showAllSymbol',
  summary:
    'A line over 60 categories. Switch showSymbol, showAllSymbol (auto, true, false), the symbol shape and a symbolSize or symbolRotate callback driven by the value, and watch which points get a marker.',
  section: 'Option: series.line',
  tags: ['showSymbol', 'showAllSymbol', 'symbol', 'symbolSize', 'symbolRotate', 'axisLabel.interval'],
  docs: ['repo/en/option/series/line.md', 'repo/en/option/partial/symbol.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
