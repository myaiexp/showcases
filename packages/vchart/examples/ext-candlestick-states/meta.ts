// vchart example: Candlestick: rising, falling and doji styles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Candlestick: rising, falling and doji styles',
  summary:
    'The candlestick series styles each candle by comparing open with close: rising, falling and doji (open equals close) each take their own boxFill and stroke. Pick a colour convention, a hollow rising body, the box width and the line width; the card flips between conventions.',
  section: 'Extensions',
  tags: ['rising', 'falling', 'doji', 'boxFill', 'boxWidth', 'stroke', 'lineWidth'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Extensions/candlestick.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
