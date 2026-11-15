// zephyr3d example: Water interaction: stones, wakes and a blocking piling
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Water interaction: stones, wakes and a blocking piling",
  summary:
    "WaterInteraction integrates a 2D wave equation on the GPU over a fixed window of the surface: addImpulse drops a stone, a WaterDisturber follows a moving hull and leaves a wake, and a blocking disturber on a piling reflects waves. isOk() reports device support.",
  section: "Environment",
  tags: ['WaterInteraction', 'WaterDisturber', 'addImpulse', 'addDisturber', 'windowSize', 'resolution', 'waveSpeed', 'damping', 'followMode', 'blocking'],
  docs: ['repo/apps/doc/web/en/water.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
