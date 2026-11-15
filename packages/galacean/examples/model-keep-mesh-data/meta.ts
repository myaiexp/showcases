// galacean example: Model: keepMeshData load param
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Model: keepMeshData load param",
  summary:
    "The same glTF is loaded with and without the keepMeshData param; only the first keeps its vertex data readable through ModelMesh.getPositions.",
  section: "Model",
  tags: ['keepMeshData','GLTFParams','ModelMesh','getPositions'],
  docs: [
    'repo/docs/en/graphics/model/glTF.mdx',
    'repo/docs/en/graphics/model/use.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
