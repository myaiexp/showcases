// galacean example: ShaderLab two-pass glass
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ShaderLab two-pass glass",
  summary: "One SubShader with two passes drawn in declaration order: BackFace culls the front and blends the inside surface faintly, FrontFace culls the back and blends the outside, so the torus reads as glass with depth.",
  section: "ShaderLab",
  tags: ['Pass','RasterState','CullMode','BlendState','multi-pass'],
  docs: [
    'repo/docs/en/graphics/material/examples/shaderlab-02-render-state.mdx',
    'repo/docs/en/graphics/material/examples/shaderlab-04-multi-pass.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
