// vchart example: Mark stateSort: which state wins when two apply
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Mark stateSort: which state wins when two apply",
  summary:
    "Two custom states match the same bars and both set the fill. stateSort orders the states, so the one sorted last paints over the other. A select flips the order.",
  section: "Option: Common",
  tags: ["stateSort","state","filter","level"],
  docs: [
    'repo/docs/assets/option/en/mark/common-mark.md',
    'repo/docs/assets/option/en/common/mark-state-style.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
