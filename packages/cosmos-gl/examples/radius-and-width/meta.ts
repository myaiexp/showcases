// cosmos-gl example: Radius and width as drawn
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Radius and width as drawn",
  summary:
    "getPointRadiusByIndex and getLinkWidthByIndex report the size and width as drawn right now, so they climb and fall with a transition instead of jumping to the target.",
  section: "Queries & sampling",
  tags: ["getPointRadiusByIndex", "getLinkWidthByIndex", "setPointSizes", "setLinkWidths"],
  docs: ['repo/src/stories/api-reference.mdx', 'repo/src/stories/configuration.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
