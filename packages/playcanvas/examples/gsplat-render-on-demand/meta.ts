// playcanvas example: Render on demand with splats
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Render on demand with splats',
  summary:
    'Once the splat system reports frame:ready the app turns autoRender off and draws only when asked: frame:request from the splat system, a camera pose change, or an explicit renderNextFrame after the example\'s own change. A readout compares update ticks with frames actually drawn; drag the view and the two count together, leave it still and the drawn count stops.',
  section: 'Gaussian Splatting',
  tags: ['AppBase.autoRender', 'AppBase.renderNextFrame', 'frame:request', 'frame:ready', 'GSplatComponentSystem'],
  docs: [
    'repo/docs/user-manual/gaussian-splatting/building/render-on-demand.md',
    'repo/docs/user-manual/gaussian-splatting/building/performance.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
