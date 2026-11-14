// vchart example: Functions: registry calls
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Functions: registry calls",
  summary:
    "registerFunction, getFunction, getFunctionList and unregisterFunction in action: registering a name changes the labels, unregistering it makes the name stop resolving, and a readout reports the registry state.",
  section: "Functions",
  tags: ['registerFunction','unregisterFunction','getFunction','getFunctionList'],
  docs: [
    "repo/docs/assets/api/en/API/function.md",
    "repo/docs/assets/guide/en/tutorial_docs/Function.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
