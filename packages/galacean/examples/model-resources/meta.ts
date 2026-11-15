// galacean example: Model: what a GLTFResource holds
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Model: what a GLTFResource holds",
  summary:
    "Three generated models loaded as GLTFResource, with the counts of their meshes, materials, skins, animation clips and entities read from the resource.",
  section: "Model",
  tags: ['GLTFResource','meshes','materials','skins','animations'],
  docs: [
    'repo/docs/en/graphics/model/assets.mdx',
    'repo/docs/en/graphics/model/model.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
