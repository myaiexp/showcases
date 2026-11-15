// tanstack-charts example: select with a function
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "select with a function",
  summary:
    "A select function receives the group's values, rows and indexes and returns one index, several, or none. This one keeps every order above the group's 90th percentile of amounts, so the number of rows kept can differ per region.",
  section: "Data Transforms",
  tags: ["select", "function", "dot"],
  docs: ["repo/docs/reference/transforms.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
