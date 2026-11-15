// galacean example: ShaderLab cull mode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ShaderLab cull mode",
  summary: "A RasterState whose CullMode is a variable, set per material to Back, Front or Off: the same torus shows its outside, its inside only, or both faces.",
  section: "ShaderLab",
  tags: ['RasterState','CullMode','shaderData.setInt'],
  docs: [
    'repo/docs/en/graphics/material/examples/shaderlab-02-render-state.mdx',
    'repo/docs/en/graphics/material/shader.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
