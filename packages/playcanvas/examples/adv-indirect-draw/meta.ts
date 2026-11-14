// playcanvas example: Indirect drawing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Indirect drawing',
  summary:
    'Each frame a mesh instance gets a fresh slot from getIndirectDrawSlot() and setIndirect(), and a compute shader writes that slot of the indirect draw buffer, here an instance count that swells and shrinks a spiral of boxes with no CPU involvement. WebGPU only: WebGL 2 shows a notice and drives instancingCount from the CPU instead.',
  section: 'Graphics: Advanced Rendering',
  tags: ['setIndirect', 'getIndirectDrawSlot', 'indirectDrawBuffer', 'getIndirectMetaData', 'maxIndirectDrawCount', 'supportsIndirectDraw', 'Compute', 'computeDispatch'],
  docs: ['repo/docs/user-manual/graphics/advanced-rendering/indirect-drawing.md', 'repo/docs/user-manual/graphics/advanced-rendering/hardware-instancing.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
