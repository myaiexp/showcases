// maplibre-gl example: Step and match
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Step and match',
  summary:
    'The same countries coloured two ways: match turns the first letter of the name into a category colour, while step cuts the name length into colour bands. A toggle flips between them; the preview alternates.',
  section: 'Expressions',
  tags: ['step', 'match', 'slice', 'length', 'get'],
  docs: [
    'pages/maplibre-org/maplibre-style-spec/expressions.md',
    'pages/maplibre-org/maplibre-style-spec/types.md',
    'pages/maplibre-org/maplibre-style-spec/layers.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Map.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
