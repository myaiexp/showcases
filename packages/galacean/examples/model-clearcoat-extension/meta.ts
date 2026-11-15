// galacean example: Model: clearcoat extension
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Model: clearcoat extension",
  summary:
    "KHR_materials_clearcoat factors of 0, 0.5 and 1 become PBRMaterial.clearCoat on three balls; a slider changes the last one.",
  section: "Model",
  tags: ['KHR_materials_clearcoat','clearCoat','clearCoatRoughness','PBRMaterial'],
  docs: [
    'repo/docs/en/graphics/model/glTF.mdx',
    'repo/docs/en/graphics/model/restoration.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
