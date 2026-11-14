// vchart example: Sankey: linkOverlap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sankey: linkOverlap",
  summary:
    "linkOverlap makes the links of one node overlap instead of fanning out side by side: start stacks them at the beginning of the node, centre at its middle and end at its tail. Added in VChart 1.11; unset gives the normal layout.",
  section: "Flow and Relation",
  tags: ["linkOverlap", "start", "center", "end"],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Sankey.md",
    "repo/docs/assets/option/en/series/sankey.md",
    "repo/docs/assets/option/en/common/mark-style.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
