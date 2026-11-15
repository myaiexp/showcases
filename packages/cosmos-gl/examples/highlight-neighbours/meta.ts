// cosmos-gl example: Highlight neighbours
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Highlight neighbours',
  summary:
    'Clicking a point asks getNeighboringPointIndices for the points linked to it and getConnectedLinkIndices for the links among that set, then passes both to highlightedPointIndices and highlightedLinkIndices. Clicking the background clears them.',
  section: 'Highlight & focus',
  tags: ['getNeighboringPointIndices', 'getConnectedLinkIndices', 'highlightedPointIndices', 'highlightedLinkIndices', 'onPointClick', 'onBackgroundClick'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
