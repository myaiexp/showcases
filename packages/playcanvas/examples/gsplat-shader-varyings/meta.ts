// playcanvas example: Varying streams
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom shaders: varying streams',
  summary:
    'A clipState varying added with app.scene.gsplat.varyings carries a per-splat uint from the vertex chunk to the fragment chunk. A box clips a hollow cube of splats as it slides through: splats wholly inside or outside are decided once per splat, and only splats crossing the box surface pay for a per-pixel test.',
  section: 'Gaussian Splatting',
  tags: ['GSplatParams.varyings', 'TYPE_UINT32', 'setClipState', 'getClipState', 'gsplatModifyVS', 'gsplatModifyPS', 'screen_size', 'gsplatGetSizeFromScale'],
  docs: [
    'repo/docs/user-manual/gaussian-splatting/building/custom-shaders/varyings.md',
    'repo/docs/user-manual/gaussian-splatting/building/custom-shaders/vertex.md',
    'repo/docs/user-manual/gaussian-splatting/building/custom-shaders/fragment.md',
    'repo/docs/user-manual/gaussian-splatting/building/custom-shaders/index.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
