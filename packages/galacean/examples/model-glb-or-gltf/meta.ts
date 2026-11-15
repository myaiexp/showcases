// galacean example: Model: .glb or .gltf
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Model: .glb or .gltf",
  summary:
    "The same robot as a single .glb and as a .gltf JSON whose buffer sits in a data URI both load through AssetType.GLTF and play their clips.",
  section: "Model",
  tags: ['AssetType.GLTF','glb','gltf'],
  docs: [
    'repo/docs/en/graphics/model/glTF.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
