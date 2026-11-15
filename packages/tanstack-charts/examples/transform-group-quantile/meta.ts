// tanstack-charts example: quantile reducer factory
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "quantile reducer factory",
  summary:
    "quantile(p) returns a reducer for any probability. Latencies for two services are grouped and reduced with the chosen p; the slider moves p from the minimum to the maximum and the bars follow. It makes the same reducer a median at 0.5 and a tail measure at 0.95.",
  section: "Data Transforms",
  tags: ["groupBy", "quantile", "barY"],
  docs: ['repo/docs/reference/transforms.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
