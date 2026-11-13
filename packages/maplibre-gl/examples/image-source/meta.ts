// maplibre-gl example: Image source
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image source',
  summary:
    'An image source pins a picture to four geographic corners. The picture is drawn on a canvas and handed over with updateImage, and setCoordinates moves the corners so the quad can be skewed.',
  section: 'Sources',
  tags: ['ImageSource', 'setCoordinates', 'updateImage', 'raster'],
  docs: [
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/ImageSource.md',
    'pages/maplibre-org/maplibre-style-spec/sources.md',
    'pages/maplibre-org/maplibre-style-spec/layers.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Map.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/type-aliases/Coordinates.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
