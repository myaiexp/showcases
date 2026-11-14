// observable-plot example: Interval transform: band scale versus utc
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Interval transform: band scale versus utc',
  summary:
    'A barY of daily volume gets a crowded band scale. A rectY with interval day gets a utc time scale, so ticks land on weeks and the market closures show as gaps.',
  section: 'Transform: Interval',
  tags: ['barY', 'rectY', 'interval', 'band scale', 'utc'],
  docs: ['repo/docs/transforms/interval.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
