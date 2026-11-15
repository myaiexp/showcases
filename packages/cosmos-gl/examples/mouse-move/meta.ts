// cosmos-gl example: Mouse move
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Mouse move',
  summary:
    'onMouseMove fires whenever the pointer moves over the canvas, with the index and position of the point under it, or undefined over empty space. The log adds the pointer position in screen pixels and, through screenToSpacePosition, in graph space.',
  section: 'Event callbacks',
  tags: ['onMouseMove', 'screenToSpacePosition', 'renderHoveredPointRing'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
