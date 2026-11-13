// maplibre-gl example: Hillshade layer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hillshade layer',
  summary:
    'A hillshade layer shades a flat map from a raster-dem source. Sliders and buttons change the illumination direction, anchor, method, exaggeration and the shadow, highlight and accent colours.',
  section: 'Terrain, sky and light',
  tags: ['hillshade', 'raster-dem', 'paint', 'illumination'],
  docs: [
    'pages/maplibre-org/maplibre-style-spec/layers.md',
    'pages/maplibre-org/maplibre-style-spec/sources.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Map.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
