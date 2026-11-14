// observable-plot example: Bar: time series with an interval
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bar: time series with an interval',
  summary:
    'Yearly bars with a missing year: setting the interval option to 1 on x makes the ordinal scale uniform so the gap shows up.',
  section: 'Mark: Bar',
  tags: ['barY', 'interval', 'tickFormat'],
  docs: ['repo/docs/marks/bar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
