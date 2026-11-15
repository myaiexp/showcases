// leaflet example: GeoJSON callbacks with bare geometries
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "GeoJSON callbacks with bare geometries",
  summary:
    "Bare geometries, a Feature and a Feature with a null geometry are added one by one. The log shows that filter and onEachFeature always receive a Feature, and that the null geometry is skipped.",
  section: "GeoJSON",
  tags: ["GeoJSON", "filter", "onEachFeature", "addData", "Feature"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ['repo/src/layer/GeoJSON.js', 'repo/MIGRATION.md', 'repo/src/layer/LayerGroup.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
