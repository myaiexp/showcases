// maplibre-gl example: Filter features
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Filter features',
  summary:
    'setFilter with expressions narrows 300 seeded random points by a magnitude threshold and a kind property, and the count updates as you change the controls.',
  section: 'Map',
  tags: ['setFilter', 'filter', 'expressions', 'circle'],
  docs: [
    'pages/maplibre-org/maplibre-style-spec/expressions.md',
    'pages/maplibre-org/maplibre-style-spec/layers.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Map.md',
    'pages/maplibre-org/maplibre-style-spec/sources.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
