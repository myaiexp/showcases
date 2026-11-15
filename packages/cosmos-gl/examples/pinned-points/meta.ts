// cosmos-gl example: Pinned points
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pinned points',
  summary:
    'setPinnedPoints holds chosen points still while the rest of the layout keeps moving and still feels their links. Pinning the four corners of a mesh stretches it between them, pinning one edge hangs it from that edge, and an empty array or null lets everything go.',
  section: 'Clusters, attractors & pins',
  tags: ['setPinnedPoints'],
  docs: ['repo/src/stories/api-reference.mdx', 'repo/src/stories/configuration.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
