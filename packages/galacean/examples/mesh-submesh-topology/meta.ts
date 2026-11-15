// galacean example: SubMesh topology
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SubMesh topology",
  summary:
    "The third argument of addSubMesh is the primitive topology. The same zigzag of ten vertices drawn as Lines, LineLoop, LineStrip, Triangles and TriangleStrip, the vertices pairing up differently each time.",
  section: "Mesh",
  tags: ['ModelMesh', 'addSubMesh', 'MeshTopology', 'clearSubMesh'],
  docs: [
    'repo/docs/en/graphics/mesh/modelMesh.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
