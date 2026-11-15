// cosmos-gl example: Hovered point ring
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hovered point ring',
  summary:
    'renderHoveredPointRing turns on a ring around whichever point is under the pointer, in hoveredPointRingColor, and hoveredPointCursor changes the cursor over points. onPointMouseOver and onPointMouseOut report each enter and leave.',
  section: 'Highlight & focus',
  tags: ['renderHoveredPointRing', 'hoveredPointRingColor', 'hoveredPointCursor', 'onPointMouseOver', 'onPointMouseOut'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
