// penrose example: rayIntersectDistance along three rays
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'rayIntersectDistance along three rays',
  summary:
    '`rayIntersectDistance` is the length of ray travelled before the first hit, and infinity on a miss. Each thick red segment runs from the origin by exactly that distance (capped at 150 so a miss shows as a long stub), ending on the shape it hit.',
  section: 'Computation: Geometry Queries',
  tags: ['rayIntersectDistance', 'min'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts', 'repo/packages/core/src/lib/Queries.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
