// Spark example: SplatMesh rendered alongside triangle meshes in one render call
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Splats and meshes in one scene',
  summary:
    'A torus knot made of splats shares a scene with a lit floor, a metal ring and a cube. One renderer.render(scene, camera) draws both kinds; the opaque meshes write depth and the splats test against it, so the ring and cube cut through the knot and hide behind it where they should. Toggle either set off to compare.',
  section: 'Overview',
  tags: ['SplatMesh', 'SparkRenderer', 'THREE.Mesh', 'depth buffer'],
  docs: ['repo/docs/docs/overview.md', 'repo/docs/docs/system-design.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
