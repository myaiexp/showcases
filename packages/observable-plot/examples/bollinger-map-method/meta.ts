// observable-plot example: Bollinger: map method
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bollinger: map method',
  summary:
    'Plot.bollinger as a map method turns three lines into the moving average of the close and its lower and upper bands, via mapY.',
  section: 'Mark: Bollinger',
  tags: ['bollinger', 'mapY', 'lineY'],
  docs: ['repo/docs/marks/bollinger.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
