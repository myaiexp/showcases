// l7 example: Cluster chart: cluster options
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Cluster chart: cluster options",
  summary:
    "radius (default 40) is how far apart points may be to merge, minZoom and maxZoom the zoom levels between which clustering happens. A bigger radius means fewer, bigger clusters.",
  section: "Tutorial: Point",
  tags: ['PointLayer', 'cluster', 'clusterOptions', 'radius', 'IClusterOption'],
  docs: ['repo/site/docs/tutorial/point/cluster.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
