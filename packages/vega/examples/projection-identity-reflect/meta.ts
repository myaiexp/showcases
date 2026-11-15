// vega example: Projections: identity, reflectX, reflectY
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Projections: identity, reflectX, reflectY",
  summary:
    "The identity projection draws longitude and latitude as plain x and y, upside down until reflectY turns it north up; two checkboxes flip each axis.",
  section: "Projections",
  tags: ["projection.type", "projection.reflectX", "projection.reflectY", "projection.fit"],
  docs: ["repo/docs/docs/projections.md", "repo/docs/docs/transforms/geoshape.md", "repo/docs/docs/transforms/filter.md", "repo/docs/data/us-10m.json"],
  provenance: 'pure',
  added: '2026-11-15',
});
