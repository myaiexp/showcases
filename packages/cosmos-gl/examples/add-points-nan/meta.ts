// cosmos-gl example: Add points from NaN slots
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Add points from NaN slots",
  summary:
    "A slot that goes from NaN to a real position fades in at that spot. The array starts with 20 filled slots of 70, and each press fills more of them.",
  section: "Adding & removing points",
  tags: ["setPointPositions", "NaN"],
  docs: [
    'repo/src/stories/api-reference.mdx',
    'repo/history/2026/2026-06-27-nan-point-removal.md',
    'repo/src/stories/configuration.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
