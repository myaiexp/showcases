// echarts example: Pies on a calendar
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pies on a calendar',
  summary:
    'A month of support tickets, one three-slice pie in each day cell. Each pie series sits in the calendar coordinate system through coordinateSystem and a date as its centre. Switch month, resize the pies and roll new data.',
  section: 'Option: series.pie',
  tags: ['pie', 'coordinateSystem', 'calendarIndex', 'center', 'calendar'],
  docs: ['repo/en/option/series/pie.md', 'repo/en/option/partial/coord-sys.md', 'repo/en/option/component/calendar.md', 'repo/contents/en/basics/release-note/5-4-0.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
