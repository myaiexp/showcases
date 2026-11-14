// Spark example: SplatMeshes as children of Groups and of each other
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Splat objects in the scene graph',
  summary:
    'A small orrery where every body is a SplatMesh built with constructSpherePoints. Planets sit inside rotating Groups, and each moon’s orbit Group is a child of its planet, so the moons inherit the planet’s motion and add their own. SplatMesh derives from Object3D, so position, rotation and parenting behave like any other object.',
  section: 'System Design',
  tags: ['SplatMesh', 'SplatGenerator', 'Object3D', 'Group', 'constructSpherePoints'],
  docs: ['repo/docs/docs/system-design.md', 'repo/docs/docs/splat-mesh.md', 'repo/docs/docs/procedural-splats.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
