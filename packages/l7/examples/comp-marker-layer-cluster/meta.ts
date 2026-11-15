// l7 example: MarkerLayer cluster options
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "MarkerLayer cluster options",
  summary:
    "cluster merges nearby markers into one; clusterOption radius sets how near, and minZoom and maxZoom bound the zoom levels where merging happens.",
  section: "Component",
  tags: ["MarkerLayer","cluster","clusterOption","radius","minZoom","maxZoom"],
  docs: ["repo/site/docs/api/component/marker_layer.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
