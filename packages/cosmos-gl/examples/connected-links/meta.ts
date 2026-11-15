// cosmos-gl example: Links between chosen points
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Links between chosen points",
  summary:
    "Click points to pick them: getConnectedLinkIndices returns the links with both ends inside the picked set, and those links are highlighted.",
  section: "Queries & sampling",
  tags: ["getConnectedLinkIndices", "highlightedLinkIndices", "onPointClick"],
  docs: ['repo/src/stories/api-reference.mdx', 'repo/src/stories/configuration.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
