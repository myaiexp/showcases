// Chart.js example: Fit the data or the ticks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Fit the data or the ticks",
  summary:
    "bounds: 'ticks' (the default) ends the axis on a whole tick so everything fits; 'data' ends it exactly at the data and drops labels outside it.",
  section: 'Axes',
  tags: ['bounds','scales.y'],
  docs: ['repo/docs/axes/cartesian/index.md','repo/docs/charts/line.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
