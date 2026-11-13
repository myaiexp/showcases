// maplibre-gl example: Feature state hover
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Feature state hover',
  summary:
    'setFeatureState and removeFeatureState flip a hover flag on a country, and a feature-state expression in the fill colour highlights it.',
  section: 'Map',
  tags: ['setFeatureState', 'removeFeatureState', 'feature-state', 'hover'],
  docs: [
    'pages/maplibre-org/maplibre-style-spec/expressions.md',
    'pages/maplibre-org/maplibre-style-spec/state.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Map.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/type-aliases/FeatureIdentifier.md',
    'pages/maplibre-org/maplibre-style-spec/layers.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
