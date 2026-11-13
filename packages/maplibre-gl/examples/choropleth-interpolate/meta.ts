// maplibre-gl example: Choropleth with interpolate
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Choropleth with interpolate',
  summary:
    'Countries coloured by an interpolate expression over a synthetic numeric score added to each country. A select switches between linear, exponential, Lab and HCL interpolation, with a legend built from the same stops.',
  section: 'Expressions',
  tags: ['interpolate', 'interpolate-lab', 'interpolate-hcl', 'choropleth', 'get'],
  docs: [
    'pages/maplibre-org/maplibre-style-spec/expressions.md',
    'pages/maplibre-org/maplibre-style-spec/types.md',
    'pages/maplibre-org/maplibre-style-spec/layers.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Map.md',
    'pages/maplibre-org/maplibre-style-spec/sources.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
