// zephyr3d example: IBL from the scattering sky
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'IBL from the scattering sky',
  summary:
    'env.sky.skyType = \'scatter\' with env.light.type = \'ibl\': the atmospheric sky itself lights the scene, needing no texture, and the baked ambient follows the sun when its direction changes. Metal and rough spheres show the reflections; a toggle compares with no ambient.',
  section: 'Lighting',
  tags: ['env.sky.skyType', 'scatter', 'env.light.type', 'ibl', 'DirectionalLight.sunLight', 'env.light.intensity', 'PBRMetallicRoughnessMaterial'],
  docs: ['repo/apps/doc/web/en/lighting-indirect.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
