// cosmos-gl example: Sampled links as arrays
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sampled links as arrays",
  summary:
    "getSampledLinks returns indices, midpoints and angles of an even sample of the visible links. A tick on each sampled link is turned by its angle.",
  section: "Queries & sampling",
  tags: ["getSampledLinks", "linkSamplingDistance"],
  docs: ['repo/src/stories/api-reference.mdx', 'repo/src/stories/configuration.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
