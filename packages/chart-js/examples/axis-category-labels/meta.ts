// Chart.js example: Category axis: named slots
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Category axis: named slots",
  summary:
    "A category axis labels its slots with names, and min and max take those names, so you can zoom a bar chart into a few months by name.",
  section: 'Axes',
  tags: ['min','max','labels','category'],
  docs: ['repo/docs/axes/cartesian/category.md','repo/docs/charts/bar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
