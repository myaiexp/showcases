// maplibre-gl example: Set paint properties
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Set paint properties',
  summary:
    'Sliders and colour pickers call setPaintProperty on the country fill, borders and ocean background to restyle a live map without reloading the style.',
  section: 'Map',
  tags: ['setPaintProperty', 'paint', 'fill', 'line'],
  docs: [
    'pages/maplibre-org/maplibre-style-spec/layers.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Map.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
