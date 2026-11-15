// cosmos-gl example: Replace links at runtime
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Replace links at runtime",
  summary:
    "Calling setLinks with a new array while the simulation runs rewires the graph: the same 48 points settle into a chain, four hubs or two rings.",
  section: "Adding & removing points",
  tags: ["setLinks", "render", "start"],
  docs: ['repo/src/stories/api-reference.mdx', 'repo/src/stories/configuration.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
