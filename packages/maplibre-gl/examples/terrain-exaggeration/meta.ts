// maplibre-gl example: Terrain exaggeration
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Terrain exaggeration',
  summary:
    'setTerrain turns 3D terrain on at runtime and a slider changes its exaggeration. queryTerrainElevation reads the height at the map centre, which scales with the exaggeration.',
  section: 'Terrain, sky and light',
  tags: ['terrain', 'setTerrain', 'queryTerrainElevation', 'exaggeration'],
  docs: [
    'pages/maplibre-org/maplibre-style-spec/terrain.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Map.md',
    'pages/maplibre-org/maplibre-style-spec/sources.md',
    'pages/maplibre-org/maplibre-style-spec/layers.md',
    'pages/maplibre-org/maplibre-style-spec/sky.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
