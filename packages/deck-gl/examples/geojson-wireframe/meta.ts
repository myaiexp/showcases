// deck-gl example: GeoJsonLayer wireframe
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "GeoJsonLayer wireframe",
  summary:
    "Two layers over the same data: a solid extrusion and a wireframe one, which the docs say cannot be combined in one layer.",
  section: 'Core layers',
  tags: ["GeoJsonLayer","extruded","wireframe","getElevation"],
  docs: ["repo/docs/api-reference/layers/geojson-layer.md","repo/docs/api-reference/core/layer.md","repo/docs/api-reference/layers/icon-layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
