// tanstack-charts example: Fold wide rows into long rows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Fold wide rows into long rows",
  summary:
    "fold repeats each wide row once per chosen field and adds a key and a value column, keeping the other fields. Four cities with a measurement for 1980 and 2015 become eight rows that a line chart draws as a slope per city. The readout lists the rows in source-row-major order.",
  section: "Data Transforms",
  tags: ["fold", "lineY", "dot", "sourceIndexes"],
  docs: [
    'repo/docs/reference/transforms.md',
    'repo/docs/reference/marks/dot-and-hexagon.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
