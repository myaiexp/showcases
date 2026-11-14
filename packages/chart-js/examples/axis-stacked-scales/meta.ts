// Chart.js example: Stacked axes sharing one x
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Stacked axes sharing one x",
  summary:
    "Axes at the same position with the same stack option share one column, and stackWeight sets how much height each gets, so two charts read as one with a common x axis.",
  section: 'Axes',
  tags: ['stack','stackWeight','offset','scales.y'],
  docs: ['repo/docs/axes/cartesian/index.md','repo/docs/axes/cartesian/_common.md','repo/docs/charts/mixed.md','repo/docs/axes/labelling.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
