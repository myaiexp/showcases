// cosmos-gl example: Outlined points
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Outlined points',
  summary:
    'outlinedPointIndices draws a ring around each listed point, in outlinedPointRingColor. It is independent of highlightedPointIndices: a point can be outlined, highlighted, both or neither.',
  section: 'Highlight & focus',
  tags: ['outlinedPointIndices', 'outlinedPointRingColor', 'highlightedPointIndices', 'setConfigPartial'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
