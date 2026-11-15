// galacean example: Model: unlit materials from glTF
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Model: unlit materials from glTF",
  summary:
    "KHR_materials_unlit loads as an UnlitMaterial that ignores light, beside a lit ball under a turning sun.",
  section: "Model",
  tags: ['KHR_materials_unlit','UnlitMaterial','PBRMaterial'],
  docs: [
    'repo/docs/en/graphics/model/glTF.mdx',
    'repo/docs/en/graphics/model/restoration.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
