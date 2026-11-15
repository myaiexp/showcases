// cosmos-gl example: Labels on sampled links
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Labels on sampled links",
  summary:
    "getSampledLinkPositionsMap gives each sampled link a midpoint and an angle, so HTML labels sit on the links and turn with them. linkSamplingDistance sets the spacing.",
  section: "Queries & sampling",
  tags: ["getSampledLinkPositionsMap", "linkSamplingDistance"],
  docs: ['repo/src/stories/api-reference.mdx', 'repo/src/stories/configuration.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
