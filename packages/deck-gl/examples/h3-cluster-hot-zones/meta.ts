// deck-gl example: H3ClusterLayer hot zones
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "H3ClusterLayer hot zones",
  summary:
    "Busy H3 cells that touch are grouped into clusters; the threshold decides which cells count, and the layer outlines each group.",
  section: 'Geo layers',
  tags: ["H3ClusterLayer","getHexagons","gridDisk","connected cells"],
  docs: ["repo/docs/api-reference/geo-layers/h3-cluster-layer.md","repo/docs/api-reference/layers/polygon-layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
