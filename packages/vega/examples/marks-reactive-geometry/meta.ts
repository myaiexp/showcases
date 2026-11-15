// vega example: Reactive Geometry: Marks as Data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Reactive Geometry: Marks as Data",
  summary:
    "Points get labels without the labels knowing the scales: the text mark reads the x and y of the named symbol marks. Raise the lift and the points move; the labels move with them.",
  section: "Marks",
  tags: ['marks.name','marks.from.data','reactive-geometry'],
  docs: ['repo/docs/docs/marks.md', 'repo/docs/docs/types.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
