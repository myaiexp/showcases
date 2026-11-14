// observable-plot example: Bollinger: window and radius
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bollinger: window and radius',
  summary:
    'bollingerY draws a moving average and a band of k standard deviations over a window of n days of the Apple closing price.',
  section: 'Mark: Bollinger',
  tags: ['bollingerY', 'n', 'k'],
  docs: ['repo/docs/marks/bollinger.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
