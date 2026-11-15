// l7 example: JSON parser: coordinates for polygons
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "JSON parser: coordinates for polygons",
  summary:
    "Area rows keep their rings in a field three arrays deep; parser coordinates points at it and the rows are drawn as polygons.",
  section: "Source",
  tags: ["parser","json","coordinates","PolygonLayer"],
  docs: ["repo/site/docs/api/source/json.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
