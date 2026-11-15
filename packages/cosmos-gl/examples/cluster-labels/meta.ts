// cosmos-gl example: Cluster labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Cluster labels',
  summary:
    'Labels follow each cluster\'s centre: getClusterPositions({ nonBlocking: true }) reads the latest centres without stalling the GPU, and spaceToScreenPosition turns them into screen positions for HTML labels redrawn every frame.',
  section: 'Clusters, attractors & pins',
  tags: ['getClusterPositions', 'spaceToScreenPosition', 'setPointClusters'],
  docs: ['repo/src/stories/api-reference.mdx', 'repo/src/stories/configuration.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
