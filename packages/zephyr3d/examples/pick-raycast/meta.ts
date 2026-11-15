// zephyr3d example: Ray picking: constructRay and scene.raycast
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Ray picking: constructRay and scene.raycast',
  summary:
    'camera.constructRay(x, y) builds a world ray through the pointer and scene.raycast(ray) returns { target, dist, point } for the nearest hit. The hit object glows and a marker sits at the hit point. It tests bounding volumes, so it is approximate.',
  section: 'Scene Picking',
  tags: ['constructRay', 'scene.raycast', 'pickable', 'emissiveColor', 'pointermove'],
  docs: ['repo/apps/doc/web/en/picking.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
