// cosmos-gl example: Cluster positions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Cluster positions',
  summary:
    'setClusterPositions pins each cluster\'s target to a spot you choose, as [x1, y1, x2, y2, …]. An undefined or NaN entry leaves that cluster at the centre of mass of its own points. Here four clusters go to the corners of a square, or only two of them do.',
  section: 'Clusters, attractors & pins',
  tags: ['setClusterPositions', 'setPointClusters', 'simulationCluster'],
  docs: ['repo/src/stories/api-reference.mdx', 'repo/src/stories/configuration.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
