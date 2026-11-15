// cosmos-gl example: Points at the ends of links
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Points at the ends of links",
  summary:
    "Click links to pick them: getConnectedPointIndices returns the points at their two ends, and both the links and the points are highlighted.",
  section: "Queries & sampling",
  tags: ["getConnectedPointIndices", "highlightedLinkIndices", "onLinkClick"],
  docs: ['repo/src/stories/api-reference.mdx', 'repo/src/stories/configuration.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
