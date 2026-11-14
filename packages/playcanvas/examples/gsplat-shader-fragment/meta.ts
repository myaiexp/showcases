// playcanvas example: Fragment stage shader chunk
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom shaders: the fragment stage',
  summary:
    'The gsplatModifyPS chunk runs for every covered pixel and receives gaussianUV, the position inside the splat footprint. Using length(gaussianUV) and fwidth it draws each splat of a galaxy as a ring of constant pixel width, with the ring width and alpha driven as material parameters.',
  section: 'Gaussian Splatting',
  tags: ['gsplatModifyPS', 'modifySplatColor', 'gaussianUV', 'fwidth', 'GSplatParams.material', 'getShaderChunks'],
  docs: [
    'repo/docs/user-manual/gaussian-splatting/building/custom-shaders/fragment.md',
    'repo/docs/user-manual/gaussian-splatting/building/custom-shaders/index.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
