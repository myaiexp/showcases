// zephyr3d example: Querying the water surface: height and normal
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Querying the water surface: height and normal",
  summary:
    "water.getSurfacePoint() runs a GPU feedback pass and returns the displaced position and normal of a batch of points, here 25 markers with a ball on the surface and a needle along the normal.",
  section: "Environment",
  tags: ['getSurfacePoint', 'Water', 'waveGenerator'],
  docs: ['repo/apps/doc/web/en/water.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
