// l7 example: style heightfixed: metres or screen pixels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "style heightfixed: metres or screen pixels",
  summary:
    "By default an extruded height is a pixel length that stays the same as you zoom; heightfixed: true makes it a fixed height in the map's own scale, so the blocks grow and shrink with the zoom. Toggle it and zoom.",
  section: "Polygon Layer",
  tags: ["PolygonLayer","style","heightfixed","extrude"],
  docs: ["repo/site/docs/api/polygon_layer/style.en.md","repo/site/docs/tutorial/polygon/extrude.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
