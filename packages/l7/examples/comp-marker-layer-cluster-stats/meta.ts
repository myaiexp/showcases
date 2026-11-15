// l7 example: MarkerLayer cluster field, method and element
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "MarkerLayer cluster field, method and element",
  summary:
    "field and method aggregate a value over each cluster (sum, max, min, mean) and element builds the cluster's DOM from point_count and point_sum.",
  section: "Component",
  tags: ["MarkerLayer","cluster","clusterOption","field","method","element","point_count","point_sum"],
  docs: ["repo/site/docs/api/component/marker_layer.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
