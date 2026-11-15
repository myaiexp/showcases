// zephyr3d example: Hex tiling against visible repetition
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Hex tiling against visible repetition",
  summary:
    "setDetailMapHexTiling samples a detail layer on a grid of hexagons, each turned and scaled at random and blended at the seams; setDetailMapHexParams sets rotation, scale and contrast. A tile with an obvious blotch makes the repetition easy to see.",
  section: "Environment",
  tags: ['setDetailMapHexTiling', 'setDetailMapHexParams', 'setDetailMapUVScale', 'numDetailMaps'],
  docs: ['repo/apps/doc/web/en/terrain-runtime.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
