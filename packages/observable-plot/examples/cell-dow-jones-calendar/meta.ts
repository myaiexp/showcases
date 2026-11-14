// observable-plot example: Cell: Dow Jones calendar
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Cell: Dow Jones calendar",
  summary: "A calendar heatmap of daily Dow Jones changes: cell with x as week of year, y as weekday and fy as year, filled by the day-over-day change on a PiYG scheme.",
  section: 'Mark: Cell',
  tags: ['cell', 'fy', 'fill', 'formatWeekday', 'tickFormat', 'inset'],
  docs: ['repo/docs/marks/cell.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
