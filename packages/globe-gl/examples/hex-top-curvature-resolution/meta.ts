// globe-gl example: Hex Bin: top curvature resolution
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Hex Bin: top curvature resolution",
  summary:
    "Two globes of huge resolution-0 hexagons, one with hexTopCurvatureResolution 60 degrees (flat lids that dip below the surface) and one with 3 degrees (curved). A slider changes the left one.",
  section: "Hex Bin Layer",
  tags: ["hexTopCurvatureResolution", "hexBinResolution"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
