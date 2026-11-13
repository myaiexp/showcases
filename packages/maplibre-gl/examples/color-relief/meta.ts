// maplibre-gl example: Color relief
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Color relief',
  summary:
    'A color-relief layer colours each pixel of a raster-dem source from its elevation, using an interpolate or step expression on the elevation input, with hillshade layered on top.',
  section: 'Terrain, sky and light',
  tags: ['color-relief', 'elevation', 'interpolate', 'step', 'hillshade'],
  docs: [
    'pages/maplibre-org/maplibre-style-spec/layers.md',
    'pages/maplibre-org/maplibre-style-spec/expressions.md',
    'pages/maplibre-org/maplibre-style-spec/sources.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Map.md',
    'pages/maplibre-org/maplibre-style-spec/root.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
