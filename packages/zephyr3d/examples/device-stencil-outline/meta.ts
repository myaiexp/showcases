// zephyr3d example: A stencil outline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A stencil outline',
  summary:
    'Two passes with stencil state: the first draws the cube and writes 1 into the stencil buffer, the second draws a scaled-up copy with a not-equal test so only the rim around the first one shows.',
  section: 'Device API',
  tags: ['useStencilState', 'setFrontCompareFunc', 'setFrontOp', 'setReference', 'setWriteMask', 'createRenderStateSet', 'setRenderStates', 'clearFrameBuffer'],
  docs: ['repo/apps/doc/web/en/devicesamples.md', 'repo/apps/doc/web/en/renderstate.md', 'repo/apps/doc/web/en/drawcall.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
