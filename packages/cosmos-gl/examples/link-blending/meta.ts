// cosmos-gl example: Link blending
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link blending',
  summary:
    'linkBlending set to false draws links as opaque shapes with hard edges instead of blending them with what is behind, which is faster on graphs with many links. Transparent link colors then show as solid.',
  section: 'Link styling',
  tags: ['linkBlending', 'setLinkColors'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
