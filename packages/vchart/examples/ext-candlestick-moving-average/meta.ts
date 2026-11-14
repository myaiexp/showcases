// vchart example: Candlestick with a moving average line
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Candlestick with a moving average line',
  summary:
    'A common chart pairs the candlestick series with a line series that carries a 5-day moving average of the close, on the same shared date axis. A 3-, 5- or 10-day period changes the line; the card steps the period.',
  section: 'Extensions',
  tags: ['candlestick', 'line', 'common', 'registerCandlestickChart', 'moving average'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Extensions/candlestick.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
