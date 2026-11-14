// echarts example: Scatter on a calendar
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scatter on a calendar',
  summary:
    'A scatter series on a calendar coordinate system: one circle per day, sized by its value. Switch calendar.orient and change cellSize and the symbol scale.',
  section: 'Option: series.scatter',
  tags: ['scatter', 'calendar', 'coordinateSystem', 'cellSize', 'orient'],
  docs: [
    'repo/en/option/series/scatter.md',
    'repo/en/option/component/calendar.md',
    'repo/en/option/partial/coord-sys.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
