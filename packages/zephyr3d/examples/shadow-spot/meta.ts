// zephyr3d example: Spot light shadows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Spot light shadows',
  summary:
    'A SpotLight with castShadow sweeping over boxes. The shadow map covers the cone, so the cone angle, depthBias and the pitch are live.',
  section: 'Shadows',
  tags: ['SpotLight', 'castShadow', 'cutoff', 'shadow.depthBias'],
  docs: ['repo/apps/doc/web/en/shadow-intro.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
