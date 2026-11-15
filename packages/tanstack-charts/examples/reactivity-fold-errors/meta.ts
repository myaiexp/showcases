// tanstack-charts example: Fold option errors are synchronous
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Fold option errors are synchronous",
  summary:
    "fold validates its options when it is called: duplicate fields, equal key and value names and the reserved names source and sourceIndexes each throw an error that starts with fold:. Each button calls fold with bad options and the readout prints the message, then a valid call shows the rows it returns.",
  section: "Transforms and Reactivity",
  tags: ["fold", "validation"],
  docs: ["repo/docs/guides/transforms-and-reactivity.md", "repo/docs/reference/transforms.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
