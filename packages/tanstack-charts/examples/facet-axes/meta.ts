// tanstack-charts example: Outer versus cell axes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Outer versus cell axes",
  summary:
    "With axes 'outer' the four regions share one y range and the ticks are drawn only on the outside, so cells are directly comparable. Switching to axes 'cell' lets each region use its own y domain and draws axes in every cell.",
  section: "Text, Frame, and Facet",
  tags: ['facet', 'axes', 'cell', 'outer'],
  docs: ['repo/docs/reference/marks/text-frame-and-facet.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
