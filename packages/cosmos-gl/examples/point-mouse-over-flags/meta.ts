// cosmos-gl example: Point hover flags
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Point hover flags',
  summary:
    'The last two arguments of onPointMouseOver, isHighlighted and isOutlined, say whether the hovered point is in highlightedPointIndices or outlinedPointIndices. One community is highlighted, one is outlined, and the log shows the flags for whichever point is hovered.',
  section: 'Event callbacks',
  tags: ['onPointMouseOver', 'onPointMouseOut', 'highlightedPointIndices', 'outlinedPointIndices'],
  docs: ['repo/src/stories/configuration.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
