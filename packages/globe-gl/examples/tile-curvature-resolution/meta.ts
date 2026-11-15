// globe-gl example: Tiles: curvature resolution
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tiles: curvature resolution",
  summary:
    "Two globes of 40 degree wireframe tiles, tileCurvatureResolution 30 degrees against 3 degrees, so the faces that approximate the curved surface can be seen. A slider changes the left one.",
  section: "Tiles Layer",
  tags: ["tileCurvatureResolution", "tileMaterial"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
