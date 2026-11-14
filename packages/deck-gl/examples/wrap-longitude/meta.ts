// deck-gl example: wrapLongitude across the antimeridian
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "wrapLongitude across the antimeridian",
  summary:
    "Routes and a box that cross 180 degrees longitude: wrapLongitude takes the short way and splits them, off it they sweep across the whole map.",
  section: "Coordinate systems",
  tags: ["wrapLongitude", "LineLayer", "PolygonLayer", "antimeridian"],
  docs: ["repo/docs/api-reference/core/layer.md", "repo/docs/developer-guide/coordinate-systems.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
