// zephyr3d example: Lambert lighting written by hand
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Lambert lighting written by hand',
  summary:
    'With only mixinLight mixed in, the fragment shader loops over the lights itself: forEachLight, calculateLightAttenuation, calculateLightDirection and calculateShadow, plus the environment irradiance. A moving point light and a shadow-casting sun feed it.',
  section: 'Custom Materials',
  tags: ['mixinLight', 'forEachLight', 'calculateLightAttenuation', 'calculateLightDirection', 'calculateShadow', 'getEnvLightIrradiance', 'needCalculateEnvLight', 'calculateNormal'],
  docs: ['repo/apps/doc/web/en/user-material-lit.md', 'repo/apps/doc/web/en/user-material.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
