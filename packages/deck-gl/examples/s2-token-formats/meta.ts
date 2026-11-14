// deck-gl example: S2Layer token formats
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "S2Layer token formats",
  summary:
    "getS2Token takes a hex token or a Hilbert quad key with a slash; both name the same cell, shown here with the cells coloured along the Hilbert curve.",
  section: 'Geo layers',
  tags: ["S2Layer","getS2Token","Hilbert quad key"],
  docs: ["repo/docs/api-reference/geo-layers/s2-layer.md","repo/docs/api-reference/layers/polygon-layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
