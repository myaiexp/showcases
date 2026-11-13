// Perspective example: range-framed, rate and ema windows over streaming ticks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Range frames, rate and EMA windows',
  summary: 'A stream of ticks feeds a table; window columns over the AAPL price use a time range frame (avg, max, rate) or an exponential moving average, and recompute incrementally as rows arrive.',
  section: 'Window Columns',
  tags: ['windows', 'range', 'rate', 'ema', 'alpha', 'streaming', 'update'],
  docs: ['repo/docs/md/explanation/view/config/windows.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
