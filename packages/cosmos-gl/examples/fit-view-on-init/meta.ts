// cosmos-gl example: Fit view on init
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fit view on init',
  summary:
    'The first view is set by fitViewOnInit and its options: fitViewDelay and fitViewDuration time the move, fitViewPadding leaves a border, and fitViewByPointsInRect or fitViewByPointIndices fit a part of the graph instead of all of it. They are read when the graph is created, so each choice builds it again.',
  section: 'View & zoom',
  tags: ['fitViewOnInit', 'fitViewDelay', 'fitViewDuration', 'fitViewPadding', 'fitViewByPointsInRect', 'fitViewByPointIndices'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
