// maplibre-gl example: GeoJSON updateData
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'GeoJSON updateData: incremental edits',
  summary:
    'Fifty moving points are kept current with GeoJSONSource.updateData, which applies a diff by feature id: update geometry, update properties, add, remove or removeAll, without replacing the whole dataset.',
  section: 'Sources',
  tags: ['GeoJSONSource', 'updateData', 'GeoJSONSourceDiff', 'feature id'],
  docs: [
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/GeoJSONSource.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/type-aliases/GeoJSONSourceDiff.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/type-aliases/GeoJSONFeatureDiff.md',
    'pages/maplibre-org/maplibre-style-spec/sources.md',
    'pages/maplibre-org/maplibre-style-spec/layers.md',
    'pages/maplibre-org/maplibre-style-spec/expressions.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Map.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
