// penrose example: inDirection: a point at a set distance along a direction
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "inDirection: a point at a set distance along a direction",
  summary:
    'The grey arrow is the direction. `encourage inDirection(p, pRef, direction, offset)` puts the orange dot exactly `offset` along that direction from the blue circle, measured as a projection, so the dot can sit anywhere on the line across the arrow. The vector need not be normalized.',
  section: "Objective Functions",
  tags: ['inDirection', 'encourage', 'objective', 'direction', 'Line'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Objectives.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
