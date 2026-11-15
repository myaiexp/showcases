// zephyr3d example: Mesh levels of detail from a shape
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Mesh levels of detail from a shape',
  summary:
    'A SphereShape created with the `lod` option simplifies itself into levels that share one vertex buffer, and a row of meshes down the view picks a level by projected size. forcedLod and minLod override the choice; the readout shows selectLod() and the triangle count per mesh.',
  section: 'Basic Framework',
  tags: ['SphereShape lod', 'Mesh.forcedLod', 'Mesh.minLod', 'Mesh.selectLod', 'Primitive.lods', 'lodMinTriangles', 'lodReduction', 'lodPixelError'],
  docs: ['repo/apps/doc/web/en/mesh-lod.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
