// galacean example: Model: duplicate and remap a material
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Model: duplicate and remap a material",
  summary:
    "The model's own material is cloned, recoloured and set on the renderers with setMaterial, the script version of the editor's duplicate and remap.",
  section: "Model",
  tags: ['Material','clone','setMaterial','PBRMaterial'],
  docs: [
    'repo/docs/en/graphics/model/assets.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
