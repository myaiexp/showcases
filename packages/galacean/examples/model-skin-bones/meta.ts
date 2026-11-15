// galacean example: Model: bend a skinned model by its bones
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Model: bend a skinned model by its bones",
  summary:
    "A skinned tentacle: the Animator is switched off and a script rotates the entities listed in Skin.bones, so the mesh follows the skeleton.",
  section: "Model",
  tags: ['Skin','bones','SkinnedMeshRenderer','Animator'],
  docs: [
    'repo/docs/en/graphics/model/glTF.mdx',
    'repo/docs/en/graphics/model/assets.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
