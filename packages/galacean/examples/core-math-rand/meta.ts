// galacean example: Math: Rand
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Math: Rand",
  summary:
    "The seedable xorshift128+ generator: two Rand instances with the same seed draw the same scatter of points, a third with another seed draws a different one, and reset() replays the sequence.",
  section: "Core",
  tags: ['Rand', 'random', 'randomInt32', 'reset'],
  docs: [
    'repo/docs/en/core/math.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
