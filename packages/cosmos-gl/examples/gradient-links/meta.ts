// cosmos-gl example: Gradient links
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Gradient links',
  summary:
    'With linkColorInterpolateFromEndpoints on, every link fades along its length from the color of its source point to the color of its target point, replacing the per-link colors. It works with any link style.',
  section: 'Link styling',
  tags: ['linkColorInterpolateFromEndpoints', 'setPointColors', 'setLinkColors'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/history/2026/2026-07-08-link-styles.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
