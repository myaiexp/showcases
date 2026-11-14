// observable-plot example: Intervals: timeInterval against utcInterval
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Intervals: timeInterval against utcInterval',
  summary:
    'timeInterval cuts at local-time boundaries and utcInterval at UTC ones; two rows of ticks show where they differ in your timezone.',
  section: 'Intervals',
  tags: ['timeInterval', 'utcInterval', 'tickX'],
  docs: ['repo/docs/features/intervals.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
