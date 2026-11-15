// zephyr3d example: Shadow region and limit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Shadow region and limit',
  summary:
    'ShadowRegion tightens the world area a directional shadow map covers: setRegion with a manual AABB, addStaticCaster and addDynamicCaster snapshots or tracked bounds, and setLimit to keep a ball that rolls away from stretching the map over empty space.',
  section: 'Shadows',
  tags: ['shadowRegion', 'setRegion', 'addStaticCaster', 'addDynamicCaster', 'removeCaster', 'clearCasters', 'setLimit', 'AABB'],
  docs: ['repo/apps/doc/web/en/shadow-aa.md', 'repo/apps/doc/web/en/shadow-intro.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
