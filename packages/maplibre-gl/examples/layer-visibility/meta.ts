// maplibre-gl example: Layer visibility and order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Layer visibility and order',
  summary:
    'Toggle layers with setLayoutProperty visibility, including a generated graticule and city circles, and reorder the graticule with moveLayer.',
  section: 'Map',
  tags: ['setLayoutProperty', 'visibility', 'moveLayer', 'layers'],
  docs: [
    'pages/maplibre-org/maplibre-style-spec/layers.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Map.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
