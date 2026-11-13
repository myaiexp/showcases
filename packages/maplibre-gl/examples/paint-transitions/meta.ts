// maplibre-gl example: Paint transitions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Paint transitions',
  summary:
    'Half the countries follow the style-level transition and half override it with fill-color-transition. Flip the colours and watch the two groups animate at different speeds; sliders tune the override.',
  section: 'Transitions',
  tags: ['transition', 'fill-color-transition', 'setPaintProperty', 'duration', 'delay'],
  docs: [
    'pages/maplibre-org/maplibre-style-spec/transition.md',
    'pages/maplibre-org/maplibre-style-spec/root.md',
    'pages/maplibre-org/maplibre-style-spec/layers.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Map.md',
    'pages/maplibre-org/maplibre-style-spec/expressions.md',
    'pages/maplibre-org/maplibre-style-spec/sources.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
