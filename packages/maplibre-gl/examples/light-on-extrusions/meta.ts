// maplibre-gl example: Light on extrusions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Light on extrusions',
  summary:
    'The style light (anchor, position, colour and intensity) lights a field of fill-extrusion blocks. Sliders move the light and a button switches its anchor between map and viewport.',
  section: 'Terrain, sky and light',
  tags: ['light', 'fill-extrusion', 'setLight', 'anchor', 'intensity'],
  docs: [
    'pages/maplibre-org/maplibre-style-spec/light.md',
    'pages/maplibre-org/maplibre-style-spec/layers.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Map.md',
    'pages/maplibre-org/maplibre-style-spec/expressions.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
