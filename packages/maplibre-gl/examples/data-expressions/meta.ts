// maplibre-gl example: Data expressions for labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Data expressions for labels',
  summary:
    'Labels and colours on city points built from data expressions: get, has, case, coalesce, concat, to-string and upcase. A select swaps the text-field expression and shows its JSON.',
  section: 'Expressions',
  tags: ['get', 'has', 'case', 'coalesce', 'concat', 'to-string', 'text-field'],
  docs: [
    'pages/maplibre-org/maplibre-style-spec/expressions.md',
    'pages/maplibre-org/maplibre-style-spec/types.md',
    'pages/maplibre-org/maplibre-style-spec/layers.md',
    'pages/maplibre-org/maplibre-style-spec/glyphs.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Map.md',
    'pages/maplibre-org/maplibre-style-spec/sources.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
