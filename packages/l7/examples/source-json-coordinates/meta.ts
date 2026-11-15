// l7 example: JSON parser: coordinates for points and paths
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "JSON parser: coordinates for points and paths",
  summary:
    "Instead of x and y fields, coordinates names one field holding [lng, lat] for a point or a list of vertices for a path, as GeoJSON does.",
  section: "Source",
  tags: ["parser","json","coordinates","PointLayer","LineLayer"],
  docs: ["repo/site/docs/api/source/json.en.md","repo/site/docs/api/source/source.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
