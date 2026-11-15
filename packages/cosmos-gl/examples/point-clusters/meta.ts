// cosmos-gl example: Point clusters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Point clusters',
  summary:
    'setPointClusters assigns each point to a cluster, and simulationCluster sets how hard the cluster force pulls points toward their cluster\'s centre. The links are random across all points, so only the cluster force sorts them into groups. A point given undefined belongs to no cluster.',
  section: 'Clusters, attractors & pins',
  tags: ['setPointClusters', 'simulationCluster', 'setConfigPartial'],
  docs: ['repo/src/stories/api-reference.mdx', 'repo/src/stories/configuration.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
