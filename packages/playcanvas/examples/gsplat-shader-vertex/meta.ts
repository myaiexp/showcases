// playcanvas example: Vertex stage shader chunk
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom shaders: the vertex stage',
  summary:
    'The gsplatModifyVS chunk runs once per splat and can override modifySplatCenter, modifySplatRotationScale and modifySplatColor. This one twists a torus knot around its vertical axis, makes the splats breathe and flashes some of them gold, with GLSL and WGSL sources set on app.scene.gsplat.material and uniforms driven through setParameter.',
  section: 'Gaussian Splatting',
  tags: ['gsplatModifyVS', 'modifySplatCenter', 'modifySplatRotationScale', 'modifySplatColor', 'GSplatParams.material', 'getShaderChunks', 'setParameter'],
  docs: [
    'repo/docs/user-manual/gaussian-splatting/building/custom-shaders/vertex.md',
    'repo/docs/user-manual/gaussian-splatting/building/custom-shaders/index.md',
    'repo/docs/user-manual/gaussian-splatting/rendering-architecture/work-buffer-rendering.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
