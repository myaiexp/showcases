// globe-gl example: Tiles: globe projection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tiles: globe projection",
  summary:
    "Two globes seen from above the north pole with the same 20 degree tiles: tileUseGlobeProjection true shapes them to the sphere, false keeps equatorial shapes that overlap near the pole.",
  section: "Tiles Layer",
  tags: ["tileUseGlobeProjection", "tileWidth", "tileHeight"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
