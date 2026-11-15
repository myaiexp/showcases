// zephyr3d example: Render states: blending, depth, culling
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Render states: blending, depth, culling',
  summary:
    'Three translucent cubes drawn with one RenderStateSet. The controls edit its blending state (alpha, additive or off), depth test and write, cull mode, and flip the vertex winding with device.reverseVertexWindingOrder.',
  section: 'Device API',
  tags: ['createRenderStateSet', 'useBlendingState', 'setBlendFunc', 'useDepthState', 'enableTest', 'enableWrite', 'useRasterizerState', 'setCullMode', 'reverseVertexWindingOrder', 'setRenderStates'],
  docs: ['repo/apps/doc/web/en/renderstate.md', 'repo/apps/doc/web/en/drawcall.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
