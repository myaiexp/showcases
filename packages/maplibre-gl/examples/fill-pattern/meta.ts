// maplibre-gl example: Fill patterns
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fill patterns',
  summary:
    'Stripe, dot and checker tiles drawn on a canvas and registered with map.addImage, then assigned to countries through a fill-pattern expression. A select swaps between match, case and single-pattern rules.',
  section: 'Layers',
  tags: ['fill-pattern', 'addImage', 'ImageData', 'match'],
  docs: [
    'pages/maplibre-org/maplibre-style-spec/layers.md',
    'pages/maplibre-org/maplibre-style-spec/expressions.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Map.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/type-aliases/StyleImageSource.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
