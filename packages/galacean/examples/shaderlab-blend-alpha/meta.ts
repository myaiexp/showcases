// galacean example: ShaderLab alpha blending
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ShaderLab alpha blending",
  summary: "A ShaderLab pass with a named BlendState (SourceAlpha, OneMinusSourceAlpha) and RenderQueueType = Transparent: overlapping spheres blend with the wall by their alpha uniform.",
  section: "ShaderLab",
  tags: ['BlendState','SourceAlpha','OneMinusSourceAlpha','RenderQueueType'],
  docs: [
    'repo/docs/en/graphics/material/examples/shaderlab-02-render-state.mdx',
    'repo/docs/en/graphics/material/shader.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
