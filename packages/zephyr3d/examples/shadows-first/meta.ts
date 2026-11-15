// zephyr3d example: Shadows: castShadow, depthBias and static casters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Shadows: castShadow, depthBias and static casters',
  summary:
    'A rotating DirectionalLight with castShadow over sixteen boxes. shadow.depthBias trades acne stripes against detached shadows, and boxes that never move are registered with shadowRegion.addStaticCaster so their shadows can be cached.',
  section: 'Getting Started',
  tags: ['castShadow', 'shadow.depthBias', 'addStaticCaster', 'DirectionalLight', 'env.light.type'],
  docs: ['repo/apps/doc/web/en/first-polish.md', 'repo/apps/doc/src/tut-16/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
