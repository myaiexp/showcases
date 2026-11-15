// cosmos-gl example: Link click
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link click',
  summary:
    'onLinkClick fires with the index of the clicked link. Here it looks up the link’s two points and gives the link focusedLinkIndex, so it is drawn wider. Clicking empty space clears it.',
  section: 'Event callbacks',
  tags: ['onLinkClick', 'onBackgroundClick', 'focusedLinkIndex', 'hoveredLinkColor'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
