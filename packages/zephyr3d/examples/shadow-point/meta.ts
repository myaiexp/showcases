// zephyr3d example: Point light shadows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Point light shadows',
  summary:
    'A PointLight with castShadow orbiting boxes: its shadow map is a cube map. depthBias, shadowMapSize and the light height are live.',
  section: 'Shadows',
  tags: ['PointLight', 'castShadow', 'shadow.depthBias', 'shadow.shadowMapSize'],
  docs: ['repo/apps/doc/web/en/shadow-intro.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
