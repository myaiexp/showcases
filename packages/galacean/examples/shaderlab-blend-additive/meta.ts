// galacean example: ShaderLab additive blending
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ShaderLab additive blending",
  summary: "A BlendState with SourceColorBlendFactor and DestinationColorBlendFactor both One: overlapping glowing spheres add their colours, brightening to white where they cross.",
  section: "ShaderLab",
  tags: ['BlendState','One','glow'],
  docs: [
    'repo/docs/en/graphics/material/examples/shaderlab-02-render-state.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
