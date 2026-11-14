// deck-gl example: TileLayer default GeoJsonLayer sub-layers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "TileLayer default GeoJsonLayer sub-layers",
  summary:
    "Without renderSubLayers each tile is drawn by a GeoJsonLayer, so getTileData can return plain GeoJSON features and GeoJsonLayer props style them.",
  section: 'Geo layers',
  tags: ["TileLayer","GeoJsonLayer","getTileData","getPointRadius","getFillColor"],
  docs: ["repo/docs/api-reference/geo-layers/tile-layer.md","repo/docs/api-reference/layers/geojson-layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
