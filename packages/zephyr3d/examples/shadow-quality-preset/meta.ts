// zephyr3d example: Shadow quality presets
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Shadow quality presets',
  summary:
    'light.shadow.applyQualityPreset configures a whole set of shadow parameters at once: \'character-small\' for close, detailed scenes and \'outdoor-large\' for open ones. The readout lists what each preset set.',
  section: 'Shadows',
  tags: ['applyQualityPreset', 'character-small', 'outdoor-large', 'shadow.mode', 'shadowMapSize', 'shadowDistance', 'numShadowCascades'],
  docs: ['repo/apps/doc/web/en/shadow-aa.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
