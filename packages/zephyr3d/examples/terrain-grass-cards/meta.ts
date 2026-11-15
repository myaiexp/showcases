// zephyr3d example: Card grass from a density map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Card grass from a density map",
  summary:
    "terrain.grassRenderer.addLayer(width, height, texture) adds alpha-tested grass cards. The layer's density map (one byte per texel over the whole terrain) is painted in code, then updateDensityRegion regenerates it. drawDistance and farDensity thin it out.",
  section: "Environment",
  tags: ['grassRenderer', 'addLayer', 'getLayer', 'densityMap', 'updateDensityRegion', 'drawDistance', 'farDensity', 'setBladeSize'],
  docs: ['repo/apps/doc/web/en/terrain-runtime.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
