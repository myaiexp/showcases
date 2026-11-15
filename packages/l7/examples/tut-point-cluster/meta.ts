// l7 example: Cluster chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Cluster chart",
  summary:
    "With cluster: true the source merges close points into clusters carrying a point_count field; a quantile scale and size() turn that into circle sizes. Zoom in and clusters split.",
  section: "Tutorial: Point",
  tags: ['PointLayer', 'cluster', 'point_count', 'scale', 'quantile', 'active'],
  docs: ['repo/site/docs/tutorial/point/cluster.en.md', 'repo/site/docs/api/point_layer/scale.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
