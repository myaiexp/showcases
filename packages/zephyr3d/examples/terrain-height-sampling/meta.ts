// zephyr3d example: Reading the terrain: height and normal under walkers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Reading the terrain: height and normal under walkers",
  summary:
    "Once whenHeightDataReady() resolves, getHeightAt(x, z) and getNormalAt(x, z) return the world height and unit normal of the ground; four markers walk a loop and stand on the surface with a needle along its normal.",
  section: "Environment",
  tags: ['getHeightAt', 'getNormalAt', 'whenHeightDataReady', 'ClipmapTerrain'],
  docs: ['repo/apps/doc/web/en/terrain-runtime.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
