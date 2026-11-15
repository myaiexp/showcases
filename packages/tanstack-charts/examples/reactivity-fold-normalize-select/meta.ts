// tanstack-charts example: Fold, normalize, select
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Fold, normalize, select",
  summary:
    "A wide table of services is folded into metric rows, normalized per metric to the 0 to 1 extent, and the first service is picked per metric with select. Each step is its own named result, and the readout shows the rows after each one.",
  section: "Transforms and Reactivity",
  tags: ["fold", "normalize", "select", "barX"],
  docs: [
    'repo/docs/guides/transforms-and-reactivity.md',
    'repo/docs/reference/transforms.md',
    'repo/docs/reference/marks/bar-and-rect.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
