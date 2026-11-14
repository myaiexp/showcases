// vchart example: Functions: instance-level registration
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Functions: instance-level registration",
  summary:
    "vchart.registerFunction scopes a name to one chart: two bar charts use the same formatMethod name and show 'units' and 'k' labels, while VChart.getFunction on the page finds nothing under that name.",
  section: "Functions",
  tags: ['vchart.registerFunction','getFunction','formatMethod'],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Function.md",
    "repo/docs/assets/api/en/API/function.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
