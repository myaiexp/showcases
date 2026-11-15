// zephyr3d example: LOD debug views: wireframe and LOD coloration
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'LOD debug views: wireframe and LOD coloration',
  summary:
    'A field of spheres with generated levels of detail. With __ZEPHYR3D_DEBUG_VIEWS__ set before the engine loads, camera.lodColoration paints each mesh in its level\'s colour and camera.wireframe draws the triangles of the level in use, so moving the camera shows the levels change.',
  section: 'Basic Framework',
  tags: ['lodColoration', 'wireframe', '__ZEPHYR3D_DEBUG_VIEWS__', 'SphereShape lod', 'lodPixelError'],
  docs: ['repo/apps/doc/web/en/mesh-lod.md', 'repo/apps/doc/web/en/performance.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
