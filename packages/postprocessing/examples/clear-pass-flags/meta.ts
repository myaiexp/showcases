// postprocessing example: ClearPass colour, depth and stencil flags
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ClearPass: colour and depth flags',
  summary:
    'ClearPass(color, depth, stencil) decides which buffers are wiped. With the colour buffer kept, old frames smear across the picture; with the depth buffer kept, the new frame can only draw where it is nearer than the old one, so the image freezes in place.',
  section: 'Passes',
  tags: ['ClearPass', 'setClearFlags', 'color', 'depth', 'stencil', 'RenderPass', 'clearPass'],
  docs: ['repo/README.md', 'repo/src/passes/ClearPass.js', 'repo/src/passes/RenderPass.js', 'repo/src/passes/CopyPass.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
