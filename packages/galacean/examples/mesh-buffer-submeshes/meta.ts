// galacean example: BufferMesh: sub-meshes with their own materials
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "BufferMesh: sub-meshes with their own materials",
  summary:
    "A hexagon's indices split into two sub-meshes: triangles drawn with the vertex-colour material and an outline drawn as LineLoop with a plain unlit one. setMaterial(index, material) gives each its own.",
  section: "Mesh",
  tags: ['BufferMesh', 'addSubMesh', 'MeshTopology', 'setMaterial', 'SubMesh'],
  docs: [
    'repo/docs/en/graphics/mesh/bufferMesh.mdx',
    'repo/docs/en/graphics/renderer/meshRenderer.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
