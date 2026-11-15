// tanstack-charts example: Callback groups and custom reducers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Callback groups and custom reducers",
  summary:
    "groupBy accepts an object bag of group fields where each is a field name or a callback, and outputs that are built-in names, quantile(p) or a custom reducer function. Orders are grouped by region and a computed profitable flag; the select picks which output the bars show.",
  section: "Transforms and Reactivity",
  tags: ["groupBy", "quantile", "median", "custom reducer", "group"],
  docs: [
    'repo/docs/guides/transforms-and-reactivity.md',
    'repo/docs/reference/transforms.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
