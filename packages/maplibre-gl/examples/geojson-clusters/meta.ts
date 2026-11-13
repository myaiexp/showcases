// maplibre-gl example: GeoJSON clusters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'GeoJSON clusters',
  summary:
    'Two thousand points are clustered by the GeoJSON source (cluster, clusterRadius, clusterMaxZoom, clusterProperties). Circles are sized and coloured by point_count, and clicking one asks getClusterExpansionZoom where it breaks apart.',
  section: 'Sources',
  tags: ['GeoJSONSource', 'cluster', 'clusterProperties', 'getClusterExpansionZoom', 'step'],
  docs: [
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/GeoJSONSource.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Map.md',
    'pages/maplibre-org/maplibre-style-spec/sources.md',
    'pages/maplibre-org/maplibre-style-spec/root.md',
    'pages/maplibre-org/maplibre-style-spec/layers.md',
    'pages/maplibre-org/maplibre-style-spec/expressions.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
