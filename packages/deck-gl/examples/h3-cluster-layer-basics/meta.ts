// deck-gl example: H3ClusterLayer basics
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "H3ClusterLayer basics",
  summary:
    "Each object is a set of H3 cells; the layer joins them into one outline polygon per cluster.",
  section: 'Geo layers',
  tags: ["H3ClusterLayer","getHexagons","getFillColor","getLineColor"],
  docs: ["repo/docs/api-reference/geo-layers/h3-cluster-layer.md","repo/docs/api-reference/layers/polygon-layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
