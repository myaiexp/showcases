// zephyr3d example: Limiting the shadow distance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Limiting the shadow distance',
  summary:
    'shadow.shadowDistance caps how far from the camera shadows are drawn, so the shadow maps cover less ground and distant pillars lose their shadows. The slider sweeps it over an avenue of pillars.',
  section: 'Shadows',
  tags: ['shadow.shadowDistance', 'numShadowCascades', 'DirectionalLight'],
  docs: ['repo/apps/doc/web/en/shadow-aa.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
