// l7 example: Source: GeoJSON
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Source: GeoJSON",
  summary:
    "GeoJSON needs no parser: L7 reads it as is, and each feature's properties are the fields.",
  section: "Point Layer",
  tags: ['PointLayer', 'source', 'parser', 'geojson'],
  docs: ['repo/site/docs/api/point_layer/source.en.md', 'repo/site/docs/api/common/layer/source.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
