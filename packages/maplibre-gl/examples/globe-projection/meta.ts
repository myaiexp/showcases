// maplibre-gl example: Globe projection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Globe projection',
  summary:
    'The style projection set to globe draws the world basemap as a sphere, wrapped in the sky atmosphere. Buttons pause the spin, switch to mercator with setProjection and hide the atmosphere.',
  section: 'Projection',
  tags: ['projection', 'globe', 'setProjection', 'atmosphere-blend', 'sky'],
  docs: [
    'pages/maplibre-org/maplibre-style-spec/projection.md',
    'pages/maplibre-org/maplibre-style-spec/types.md',
    'pages/maplibre-org/maplibre-style-spec/sky.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Map.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
