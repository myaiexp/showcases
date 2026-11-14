// vchart example: Nested pies from a common chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Nested pies from a common chart",
  summary:
    "A common chart holds two pie series on two datasets: a solid inner pie of age groups and a donut ring of age bands, set apart by outerRadius and innerRadius. updateData on both datasets keeps the rings in step.",
  section: "Pie, Rose and Radar",
  tags: ['pie', 'common', 'series', 'dataIndex', 'outerRadius', 'innerRadius'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Pie.md',
    'repo/docs/assets/option/en/series/pie.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
