// cosmos-gl example: Maximum point size
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Maximum point size",
  summary:
    "graph.maxPointSize is the largest point size this GPU can draw with gl.POINTS. Slide the requested size past it and compare.",
  section: "Queries & sampling",
  tags: ["maxPointSize", "setPointSizes"],
  docs: ['repo/src/stories/api-reference.mdx', 'repo/src/stories/configuration.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
