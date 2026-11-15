// galacean example: ShaderLab Common.glsl include
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ShaderLab Common.glsl include",
  summary: "Registering the engine's built-in snippets with registerIncludes() and writing #include \"Common.glsl\" gives the shader PI, pow2, saturate and linearToGamma. Three ramps: raw, squared with pow2, and gamma-encoded.",
  section: "ShaderLab",
  tags: ['#include','Common.glsl','registerIncludes','pow2','linearToGamma'],
  docs: [
    'repo/docs/en/graphics/material/shader.mdx',
    'repo/docs/en/graphics/material/shaderAPI.mdx',
    'repo/docs/en/graphics/material/examples/shaderlab-05-advance.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
