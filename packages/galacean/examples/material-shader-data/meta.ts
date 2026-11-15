// galacean example: Material shader data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Material shader data",
  summary: "A Material made from a built-in shader and fed through shaderData: setColor(\"material_BaseColor\") and setTexture(\"material_BaseTexture\") plus the macro that turns the texture on.",
  section: "Material",
  tags: ['Material','ShaderData','Shader.find'],
  docs: [
    'repo/docs/en/graphics/material/overview.mdx',
    'repo/docs/en/graphics/material/baseUse.mdx',
    'repo/docs/en/graphics/material/variables.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
