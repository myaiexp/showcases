// zephyr3d example: Skin material: SSSProfile presets and their transmission
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Skin material: SSSProfile presets and their transmission',
  summary:
    'Seven spheres, one per SSSProfile preset (skin, skin_pale, skin_tan, skin_dark, wax, jade, marble), are lit from behind. On WebGL2 the profile\'s transmission tint, extinctionScale and scatteringDistribution still shape the glow; its diffusion radii do not draw.',
  section: 'Character Rendering',
  tags: ['SSSProfile', 'preset', 'transmissionTint', 'extinctionScale', 'scatteringDistribution', 'meanFreePathDistance', 'subsurfaceProfile'],
  docs: ['repo/apps/doc/web/en/material-skin.md', 'repo/apps/doc/web/en/backend-support.md', 'repo/apps/doc/web/en/asset-loading.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
