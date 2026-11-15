// l7 example: style raisingHeight on an extrude
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "style raisingHeight on an extrude",
  summary:
    "With heightfixed: true, raisingHeight lifts the whole block off the ground by that much, in the same map-scale units as the height, leaving a gap underneath.",
  section: "Polygon Layer",
  tags: ["PolygonLayer","style","raisingHeight","heightfixed","extrude"],
  docs: ["repo/site/docs/api/polygon_layer/style.en.md","repo/site/docs/tutorial/polygon/extrude.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
