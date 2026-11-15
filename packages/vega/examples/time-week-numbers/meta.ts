// vega example: Time: Week Numbers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Time: Day, Week and Quarter Numbers',
  summary:
    'dayofyear, week, isoweek, utcweek, utcisoweek, quarter and utcquarter for nine dates around year boundaries, where Sunday-based week 0 and ISO week 53 appear.',
  section: 'Time',
  tags: ['time.dayofyear', 'time.week', 'time.isoweek', 'time.utcweek', 'time.utcisoweek', 'util.quarter'],
  docs: ['repo/docs/docs/api/time.md', 'repo/docs/docs/api/util.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
