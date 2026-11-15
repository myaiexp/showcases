// zephyr3d example: Eye material: socket occlusion and contact AO with blinking lids
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Eye material: socket occlusion and contact AO with blinking lids',
  summary:
    'An eyeball sits between two eyelid shells that blink. Analytic socketOcclusion darkens the ambient light by lid angles, and contactAO reads the depth prepass to follow the real lid mesh. Toggle either or both.',
  section: 'Character Rendering',
  tags: ['EyeMaterial', 'socketOcclusion', 'upperLidAngle', 'lowerLidAngle', 'contactAO', 'contactAORadius', 'contactAOStrength'],
  docs: ['repo/apps/doc/web/en/material-eye.md', 'repo/apps/doc/web/en/asset-loading.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
