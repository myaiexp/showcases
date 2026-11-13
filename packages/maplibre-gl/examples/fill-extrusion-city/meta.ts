// maplibre-gl example: Fill extrusion city
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fill extrusion city',
  summary:
    'A generated grid of building footprints extruded into 3D with fill-extrusion-height, fill-extrusion-base and a colour ramp, all read from feature properties. The camera is pitched and orbits in the preview.',
  section: 'Layers',
  tags: ['fill-extrusion', '3D', 'pitch', 'data-driven'],
  docs: [
    'pages/maplibre-org/maplibre-style-spec/layers.md',
    'pages/maplibre-org/maplibre-style-spec/expressions.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Map.md',
    'pages/maplibre-org/maplibre-style-spec/sources.md',
    'pages/maplibre-org/maplibre-style-spec/root.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/NavigationControl.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
