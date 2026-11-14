// vchart example: Extension chart: candlestick
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Extension chart: candlestick',
  summary:
    'The candlestick extension chart: openField, highField, lowField and closeField draw each day\'s candle, rising in red and falling in green. In the card the candles are replaced with a fresh random walk every few seconds.',
  section: 'Extensions',
  tags: ['candlestick', 'registerCandlestickChart', 'openField', 'highField', 'lowField', 'closeField', 'rising', 'falling'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Extensions/candlestick.md',
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Extensions/about_extensions.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
