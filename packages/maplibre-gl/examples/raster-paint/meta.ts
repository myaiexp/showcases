// maplibre-gl example: Raster paint properties
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Raster paint properties',
  summary:
    'A raster layer on an image source built from a canvas-generated data URL, so it needs no network. Sliders drive raster-hue-rotate, saturation, contrast, brightness-min/max and opacity; the preview cycles the hue.',
  section: 'Layers',
  tags: ['raster', 'image source', 'raster-hue-rotate', 'raster-saturation', 'raster-contrast'],
  docs: [
    'pages/maplibre-org/maplibre-style-spec/layers.md',
    'pages/maplibre-org/maplibre-style-spec/sources.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Map.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
