// playcanvas example: A custom GSplatFormat
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A custom GSplatFormat with per-instance tints',
  summary:
    'A GSplatFormat with one RGBA8 stream and its own GLSL and WGSL read code: the texel is decoded into a position and a gradient factor, and two uniforms tint it. Three gsplat components share one container and each sets uTint and uTint2 through setParameter, so every instance has its own colours.',
  section: 'Gaussian Splatting',
  tags: ['GSplatFormat', 'readGLSL', 'readWGSL', 'PIXELFORMAT_RGBA8', 'GSplatContainer', 'GSplatComponent.setParameter', 'getCenter', 'getColor'],
  docs: [
    'repo/docs/user-manual/gaussian-splatting/building/procedural-splats/index.md',
    'repo/docs/user-manual/gaussian-splatting/rendering-architecture/splat-data-format.md',
    'repo/docs/user-manual/gaussian-splatting/rendering-architecture/work-buffer-format.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
