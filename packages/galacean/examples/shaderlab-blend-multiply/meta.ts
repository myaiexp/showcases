// galacean example: ShaderLab multiplicative blending
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ShaderLab multiplicative blending",
  summary: "SourceColorBlendFactor = DestinationColor with DestinationColorBlendFactor = Zero multiplies whatever is behind, like a tinted film: coloured panes darken the bright wall instead of covering it.",
  section: "ShaderLab",
  tags: ['BlendState','DestinationColor','Zero'],
  docs: [
    'repo/docs/en/graphics/material/examples/shaderlab-02-render-state.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
