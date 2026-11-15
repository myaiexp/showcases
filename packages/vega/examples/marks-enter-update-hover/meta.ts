// vega example: Enter, Update and Hover Sets
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Enter, Update and Hover Sets",
  summary:
    "Bars arrive over time. Each takes its colour from the enter set at birth and keeps it, while the update set re-evaluates the height whenever the gain signal moves, and hover outlines the bar under the pointer.",
  section: "Marks",
  tags: ['marks.encode.enter','marks.encode.update','marks.encode.hover','marks.encode.exit'],
  docs: ['repo/docs/docs/marks.md', 'repo/docs/docs/types.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
