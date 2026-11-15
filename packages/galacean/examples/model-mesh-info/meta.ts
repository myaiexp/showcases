// galacean example: Model: mesh sub-asset info
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Model: mesh sub-asset info",
  summary:
    "Each renderer of a loaded model exposes its ModelMesh; the card reads vertexCount, subMeshes and bounds for one part after another.",
  section: "Model",
  tags: ['ModelMesh','vertexCount','subMeshes','bounds'],
  docs: [
    'repo/docs/en/graphics/model/assets.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
