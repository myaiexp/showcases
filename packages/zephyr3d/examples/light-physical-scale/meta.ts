// zephyr3d example: Scene scale for physical lighting
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scene scale for physical lighting',
  summary:
    'Physical lighting has inverse-square falloff, so the engine needs scene.metersPerUnit (1 by default). The same room and the same 1500 lm bulb lit with different scales: a smaller scale puts the bulb physically closer and the room much brighter.',
  section: 'Lighting',
  tags: ['scene.metersPerUnit', 'scene.lightingMode', 'PointLight.luminousPower'],
  docs: ['repo/apps/doc/web/en/lighting-physical.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
