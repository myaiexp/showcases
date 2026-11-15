// galacean example: ShaderLab uniform types from shaderData
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ShaderLab uniform types from shaderData",
  summary: "One ShaderLab shader declares float, vec2, vec3, vec4, int and sampler2D uniforms and the script writes each with its shaderData setter. Sliders in the full view drive them; the card animates them.",
  section: "ShaderLab",
  tags: ['setFloat','setVector2','setVector3','setVector4','setInt','setColor'],
  docs: [
    'repo/docs/en/graphics/material/shader.mdx',
    'repo/docs/en/graphics/material/variables.mdx',
    'repo/docs/en/graphics/material/baseUse.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
