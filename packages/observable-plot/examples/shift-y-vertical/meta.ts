// observable-plot example: Shift: shiftY with differenceX
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Shift: shiftY with differenceX',
  summary:
    'shiftY is the vertical twin of shiftX: with time on the y axis it derives y1, and differenceX shades the sideways change. The interval can be a signed count, a name or a weekday.',
  section: 'Transform: Shift',
  tags: ['differenceX', 'shiftY', 'interval', 'y1'],
  docs: ['repo/docs/transforms/shift.md', 'repo/docs/features/intervals.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
