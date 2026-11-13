// maplibre-gl example: Display a map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Display a map',
  summary:
    'The smallest MapLibre setup: a Map in a container, given a style document, a centre and a zoom. The style here is an object built in code from local country shapes, so no tile server is involved.',
  section: 'Getting started',
  tags: ['Map', 'style', 'center', 'zoom'],
  docs: [
    'repo/docs/index.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Map.md',
    'pages/maplibre-org/maplibre-style-spec/root.md',
    'pages/maplibre-org/maplibre-style-spec/sources.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
