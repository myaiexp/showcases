// cosmos-gl example: Unbounded space
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Unbounded space',
  summary:
    'A layout is no longer held inside the space: spaceSize only places the origin. Here spaceSize is 300 (the dashed orange square) and a repelling graph spreads far past it, and getPointPositions() reads back coordinates outside 0 to 300, negative ones included.',
  section: 'Simulation control',
  tags: ['spaceSize', 'getPointPositions', 'spaceToScreenPosition'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx', 'repo/history/2026/2026-10-14-unbounded-space.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
