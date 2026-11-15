// l7 example: style topsurface: hide the roofs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "style topsurface: hide the roofs",
  summary:
    "topsurface: false leaves the roofs off, so the blocks look like open boxes from above. It needs pickLight: true here: on the plain extrude shader it discards every face.",
  section: "Polygon Layer",
  tags: ["PolygonLayer","style","topsurface","extrude"],
  docs: ["repo/site/docs/api/polygon_layer/style.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
