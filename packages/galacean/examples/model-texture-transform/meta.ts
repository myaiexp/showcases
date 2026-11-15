// galacean example: Model: texture transform extension
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Model: texture transform extension",
  summary:
    "KHR_texture_transform scale and offset in the file become the material's tilingOffset, which the script then scrolls.",
  section: "Model",
  tags: ['KHR_texture_transform','tilingOffset','PBRMaterial'],
  docs: [
    'repo/docs/en/graphics/model/glTF.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
