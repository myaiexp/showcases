// cosmos-gl example: Labels on sampled points
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Labels on sampled points",
  summary:
    "getSampledPointPositionsMap({ nonBlocking: true }) returns an even sample of the visible points, and pointSamplingDistance sets the spacing. Zoom and the sample changes with the view.",
  section: "Queries & sampling",
  tags: ["getSampledPointPositionsMap", "pointSamplingDistance", "nonBlocking"],
  docs: [
    'repo/src/stories/api-reference.mdx',
    'repo/src/stories/configuration.mdx',
    'repo/history/2026/2026-11-04-sampled-point-readback.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
