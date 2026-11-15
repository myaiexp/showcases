// tanstack-charts example: Source, represented, prepared and rendered
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Source, represented, prepared and rendered",
  summary:
    "Three ways to show the same 30,000 rows, each with its four counts: source rows, rows represented by the encoding, rows or cells prepared for marks, and scene nodes rendered. A sample of dots represents fewer rows than the source and says so, while the grids represent all of them.",
  section: "Large Data",
  tags: ['createChartScene', 'rect', 'dot', 'scene.nodes', 'accounting'],
  docs: ['repo/docs/guides/large-data.md', 'repo/docs/reference/runtime-and-scene.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
