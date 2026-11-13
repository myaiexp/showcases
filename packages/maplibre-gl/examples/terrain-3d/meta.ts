// maplibre-gl example: 3D terrain
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '3D terrain',
  summary:
    'A raster-dem source raises the map into 3D terrain and also feeds a hillshade layer, under a sky with fog. The TerrainControl toggles the relief on and off.',
  section: 'Terrain, sky and light',
  tags: ['terrain', 'raster-dem', 'hillshade', 'sky', 'TerrainControl', 'pitch'],
  docs: [
    'pages/maplibre-org/maplibre-style-spec/terrain.md',
    'pages/maplibre-org/maplibre-style-spec/sky.md',
    'pages/maplibre-org/maplibre-style-spec/sources.md',
    'pages/maplibre-org/maplibre-style-spec/layers.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/TerrainControl.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/type-aliases/NavigationControlOptions.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/functions/addProtocol.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/NavigationControl.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Map.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
