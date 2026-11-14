// deck-gl example: GeohashLayer extruded with labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "GeohashLayer extruded with labels",
  summary:
    "Geohash cells raised by their count, with each cell's string drawn on top: neighbouring cells share a prefix.",
  section: 'Geo layers',
  tags: ["GeohashLayer","extruded","getElevation","wireframe","TextLayer"],
  docs: ["repo/docs/api-reference/geo-layers/geohash-layer.md","repo/docs/api-reference/layers/polygon-layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
