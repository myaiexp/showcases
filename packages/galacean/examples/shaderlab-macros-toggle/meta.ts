// galacean example: ShaderLab macros toggled at runtime
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ShaderLab macros toggled at runtime",
  summary: "One shader with USE_TEXTURE and ENABLE_ANIMATION macros: enableMacro and disableMacro swap compiled variants, turning the checker texture and the vertex wobble on and off. The card walks through all four combinations.",
  section: "ShaderLab",
  tags: ['enableMacro','disableMacro','#ifdef','scene_ElapsedTime'],
  docs: [
    'repo/docs/en/graphics/material/examples/shaderlab-03-ui-script.mdx',
    'repo/docs/en/graphics/material/shader.mdx',
    'repo/docs/en/graphics/material/variables.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
