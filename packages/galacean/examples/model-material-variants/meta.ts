// galacean example: Model: material variants
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Model: material variants",
  summary:
    "KHR_materials_variants in a glTF: extensionsData.variants pairs renderers with materials, and Renderer.setMaterial switches the whole model between Candy, Steel and Gold.",
  section: "Model",
  tags: ['extensionsData','KHR_materials_variants','setMaterial'],
  docs: [
    'repo/docs/en/graphics/model/use.mdx',
    'repo/docs/en/graphics/model/glTF.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
