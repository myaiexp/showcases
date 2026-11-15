// tanstack-charts example: forceLayout with a custom force
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "forceLayout with a custom force",
  summary:
    "A custom descriptor adds any D3-compatible force by name. A forceRadial pulls nodes toward rings by group, built inside create with access to the private node records and key accessor. Built-in forces still apply in the authored order.",
  section: "Data Transforms",
  tags: ["forceLayout", "custom", "forceRadial"],
  docs: ["repo/docs/reference/transforms.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
