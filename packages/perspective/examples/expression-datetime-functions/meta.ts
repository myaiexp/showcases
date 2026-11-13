// Perspective example: datetime functions in expressions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Datetime expression functions',
  summary: 'bucket() rolls datetimes into months and weeks, day_of_week() and month_of_year() name them, and float()/datetime() move through the millisecond epoch to offset a date by seven days.',
  section: 'Expressions',
  tags: ['expressions', 'bucket', 'day_of_week', 'month_of_year', 'datetime', 'group_by'],
  docs: ['repo/docs/md/explanation/view/config/expressions.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
