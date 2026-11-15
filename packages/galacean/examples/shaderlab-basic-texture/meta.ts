// galacean example: ShaderLab basic textured shader
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ShaderLab basic textured shader",
  summary: "The first ShaderLab tutorial shader: Shader, SubShader and Pass nesting, a vertex shader passing UVs and a fragment shader multiplying the texture by material_BaseColor. A colour picker feeds the uniform.",
  section: "ShaderLab",
  tags: ['Shader.create','Shader','SubShader','Pass','VertexShader','FragmentShader'],
  docs: [
    'repo/docs/en/graphics/material/examples/shaderlab-01-basic-shader.mdx',
    'repo/docs/en/graphics/material/shader.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
