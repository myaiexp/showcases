// cosmos-gl example: Sampled points as arrays
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sampled points as arrays",
  summary:
    "getSampledPoints returns the indices and positions of an even sample of the visible points as two arrays. Rings mark them; pointSamplingDistance sets how many there are.",
  section: "Queries & sampling",
  tags: ["getSampledPoints", "pointSamplingDistance", "nonBlocking"],
  docs: [
    'repo/src/stories/api-reference.mdx',
    'repo/src/stories/configuration.mdx',
    'repo/history/2026/2026-11-04-sampled-point-readback.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
