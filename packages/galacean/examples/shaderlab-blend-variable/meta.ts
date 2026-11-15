// galacean example: ShaderLab blend factors from shaderData
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ShaderLab blend factors from shaderData",
  summary: "Render state values can be variables: the BlendState reads sourceColorBlendFactor and destinationColorBlendFactor, and the script sets them with shaderData.setInt. The sphere cycles through alpha, additive and multiply this way.",
  section: "ShaderLab",
  tags: ['BlendState','shaderData.setInt','BlendFactor'],
  docs: [
    'repo/docs/en/graphics/material/shader.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
