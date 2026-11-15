// cosmos-gl example: Hovered link
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hovered link',
  summary:
    'A link under the pointer is drawn in hoveredLinkColor and hoveredLinkWidthIncrease pixels wider, and hoveredLinkCursor changes the cursor. onLinkMouseOver and onLinkMouseOut report each enter and leave.',
  section: 'Highlight & focus',
  tags: ['hoveredLinkColor', 'hoveredLinkWidthIncrease', 'hoveredLinkCursor', 'onLinkMouseOver', 'onLinkMouseOut'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
