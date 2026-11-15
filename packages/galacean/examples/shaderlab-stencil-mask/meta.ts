// galacean example: ShaderLab stencil mask
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ShaderLab stencil mask",
  summary: "Two shaders make a portal: one pass writes stencil value 1 with colour writes off, the other draws only where the stencil equals 1. A pattern appears only inside the moving window.",
  section: "ShaderLab",
  tags: ['StencilState','ReferenceValue','CompareFunctionFront','PassOperationFront','ColorWriteMask'],
  docs: [
    'repo/docs/en/graphics/material/examples/shaderlab-02-render-state.mdx',
    'repo/docs/en/graphics/material/shader.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
