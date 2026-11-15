// cosmos-gl example: Color and size transition
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Color and size transition",
  summary:
    "setPointColors and setPointSizes are animated too: call one or both, then render(), and the points fade to their new colours and grow or shrink to their new sizes in one shared transition.",
  section: "Transitions",
  tags: ["setPointColors", "setPointSizes", "transitionDuration"],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
