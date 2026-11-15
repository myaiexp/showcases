// vega example: Faceting into Group Marks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Faceting into Group Marks",
  summary:
    "One stream of readings is split by series into three group marks. Each group draws its own partition as a line, plus a rule at the mean the facet aggregate computed for it.",
  section: "Marks",
  tags: ['marks.from.facet','facet.groupby','facet.aggregate'],
  docs: ['repo/docs/docs/marks.md', 'repo/docs/docs/types.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
