// vchart example: Functions: a spec that is plain JSON
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Functions: a spec that is plain JSON",
  summary:
    "The spec is JSON text, so its callbacks cannot be functions: bar fill, label formatMethod and tooltip key and value are names of registered functions instead. The JSON is printed under the chart.",
  section: "Functions",
  tags: ['registerFunction','JSON','tooltip.mark.content','formatMethod'],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Function.md",
    "repo/docs/assets/api/en/API/function.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
