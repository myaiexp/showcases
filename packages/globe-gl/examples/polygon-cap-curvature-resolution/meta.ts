// globe-gl example: Polygons: cap curvature resolution
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Polygons: cap curvature resolution",
  summary:
    "Two globes show the same countries with wireframe caps, one at polygonCapCurvatureResolution 20 and one at 2 degrees, so the triangles of the cap surface can be counted. A slider changes the right globe.",
  section: "Polygons Layer",
  tags: ["polygonCapCurvatureResolution", "polygonCapMaterial"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
