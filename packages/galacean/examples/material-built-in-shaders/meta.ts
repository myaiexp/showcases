// galacean example: Built-in shaders compared
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Built-in shaders compared",
  summary: "The same sphere in the three built-in shaders (PBR, Blinn-Phong, Unlit) while the sun circles overhead: the lit materials shade and highlight as the light moves, the unlit one stays flat.",
  section: "Material",
  tags: ['PBRMaterial','BlinnPhongMaterial','UnlitMaterial'],
  docs: [
    'repo/docs/en/graphics/material/overview.mdx',
    'repo/docs/en/graphics/material/builtinShaders/pbr.mdx',
    'repo/docs/en/graphics/material/builtinShaders/blinnPhong.mdx',
    'repo/docs/en/graphics/material/builtinShaders/unlit.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
