// plotly-js example: 3D clusters with grouped hulls
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "3D clusters with grouped hulls",
  summary: "Three clusters, each a marker trace and a mesh hull in one legend group, so one click hides both.",
  section: "3D Cluster Graph",
  tags: ['scatter3d','mesh3d','legendgroup','alphahull'],
  docs: ['repo/_posts/plotly_js/3d/3d-cluster/2015-08-10-3d-point-cluster.html', 'repo/normal-clusters.csv'],
  provenance: 'pure',
  added: '2026-11-15',
});
