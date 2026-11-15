// tanstack-charts example: Memoize the pipeline at its owner
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Memoize the pipeline at its owner",
  summary:
    "The transform pipeline is wrapped in a small memo that re-runs only when the source rows or the window size change. Buttons change bar colour or the data and the counters show how often the pipeline actually ran against how often the chart was updated; TanStack Charts adds no cache of its own.",
  section: "Transforms and Reactivity",
  tags: ["groupBy", "rollingWindow", "memo", "host.update"],
  docs: ['repo/docs/guides/transforms-and-reactivity.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
