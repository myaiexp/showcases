// vchart example: Functions: register a function and use its name
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Functions: register a function and use its name",
  summary:
    "VChart.registerFunction registers callbacks page-wide, and label.formatMethod is then given as the function's name string. A selector swaps between three registered names with updateSpec.",
  section: "Functions",
  tags: ['VChart.registerFunction','formatMethod','label'],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Function.md",
    "repo/docs/assets/api/en/API/function.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
