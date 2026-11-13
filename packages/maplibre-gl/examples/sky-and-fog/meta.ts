// maplibre-gl example: Sky and fog
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sky and fog',
  summary:
    'setSky restyles the sky, horizon and fog of a steeply pitched terrain view. Colour pickers set sky-color, horizon-color and fog-color; sliders set the three blend properties.',
  section: 'Terrain, sky and light',
  tags: ['sky', 'fog', 'horizon', 'setSky', 'terrain', 'pitch'],
  docs: [
    'pages/maplibre-org/maplibre-style-spec/sky.md',
    'pages/maplibre-org/maplibre-style-spec/terrain.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Map.md',
    'pages/maplibre-org/maplibre-style-spec/sources.md',
    'pages/maplibre-org/maplibre-style-spec/layers.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
