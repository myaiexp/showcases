// cosmos-gl example: Cluster strength
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Cluster strength',
  summary:
    'setPointClusterStrength gives each point its own cluster pull. With equal strengths the points form tight clumps, with strengths that fade along each cluster the first points sit at the centre and the later ones drift out to the rim.',
  section: 'Clusters, attractors & pins',
  tags: ['setPointClusterStrength', 'setPointClusters', 'simulationCluster'],
  docs: ['repo/src/stories/api-reference.mdx', 'repo/src/stories/configuration.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
