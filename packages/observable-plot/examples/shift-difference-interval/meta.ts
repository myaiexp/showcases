// observable-plot example: Shift: price change over an interval
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Shift: price change over an interval',
  summary:
    'shiftX derives x1 from the date, so differenceY shades where the Apple price rose or fell over the interval. The slider sets the number of days shifted.',
  section: 'Transform: Shift',
  tags: ['differenceY', 'shiftX', 'interval', 'x1'],
  docs: ['repo/docs/transforms/shift.md', 'repo/docs/marks/difference.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
