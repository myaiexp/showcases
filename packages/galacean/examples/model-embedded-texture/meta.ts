// galacean example: Model: reuse an embedded texture
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Model: reuse an embedded texture",
  summary:
    "An image embedded in the .glb is a Texture2D in GLTFResource.textures; a second material outside the model borrows it as its baseTexture.",
  section: "Model",
  tags: ['GLTFResource.textures','Texture2D','baseTexture'],
  docs: [
    'repo/docs/en/graphics/model/assets.mdx',
    'repo/docs/en/graphics/model/model.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
