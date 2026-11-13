// maplibre-gl example: Custom coordinate system
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom coordinate system',
  summary:
    'addProjection registers a flat metre-based coordinate system with its own tile grid, and the style selects it by name. A drawn floor plan is placed by lng/lat corners, with markers and a readout of plan metres.',
  section: 'Guides',
  tags: ['addProjection', 'CRS', 'projection', 'image source', 'tileMatrixSet', 'removeProjection'],
  docs: [
    'repo/docs/guides/custom-crs.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/functions/addProjection.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/functions/removeProjection.md',
    'pages/maplibre-org/maplibre-style-spec/projection.md',
    'pages/maplibre-org/maplibre-style-spec/sources.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Marker.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Popup.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Map.md',
    'pages/maplibre-org/maplibre-style-spec/layers.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/type-aliases/CRS.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/type-aliases/TileMatrixSet.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
