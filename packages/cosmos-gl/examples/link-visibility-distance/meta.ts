// cosmos-gl example: Link visibility by distance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link visibility by distance',
  summary:
    'Links fade out as they get longer on screen. linkVisibilityDistanceRange gives the length where fading starts and the length where it ends, and linkVisibilityMinTransparency is the opacity of the longest links.',
  section: 'Link styling',
  tags: ['linkVisibilityDistanceRange', 'linkVisibilityMinTransparency'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
