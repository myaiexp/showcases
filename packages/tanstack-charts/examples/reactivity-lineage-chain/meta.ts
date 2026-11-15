// tanstack-charts example: Lineage from a bar back to the source row
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Lineage from a bar back to the source row",
  summary:
    "In a fold then normalize pipeline each derived row points to its immediate input through source and sourceIndexes. Pick a bar and the readout walks normalized, folded and original rows, so a tooltip or drill-down can reach the raw record.",
  section: "Transforms and Reactivity",
  tags: ["fold", "normalize", "source", "sourceIndexes", "barY"],
  docs: [
    'repo/docs/guides/transforms-and-reactivity.md',
    'repo/docs/reference/transforms.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
