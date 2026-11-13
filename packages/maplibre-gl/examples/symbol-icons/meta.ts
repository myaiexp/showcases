// maplibre-gl example: Symbol icons and labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Symbol icons and labels',
  summary:
    'A symbol layer using arrow icons drawn on a canvas and added with map.addImage, with icon-rotate and icon-size read from properties, text-field labels positioned by text-anchor and text-offset, and checkboxes for the collision options.',
  section: 'Layers',
  tags: ['symbol', 'icon-image', 'text-field', 'addImage', 'collision'],
  docs: [
    'pages/maplibre-org/maplibre-style-spec/layers.md',
    'pages/maplibre-org/maplibre-style-spec/glyphs.md',
    'pages/maplibre-org/maplibre-style-spec/expressions.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Map.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/type-aliases/StyleImageSource.md',
    'pages/maplibre-org/maplibre-style-spec/sources.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
