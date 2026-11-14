// playcanvas example: Gaussian splat renderers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Choosing the splat renderer',
  summary:
    'Scene.gsplat.renderer picks between automatic selection, raster with CPU sorting in a Web Worker, and raster with GPU sorting, which needs WebGPU. A readout shows the requested renderer next to currentRenderer, the one actually in effect after the WebGL fallback; shaking the camera makes the asynchronous CPU sort visible as brief lag.',
  section: 'Gaussian Splatting',
  tags: ['GSplatParams.renderer', 'GSplatParams.currentRenderer', 'GSPLAT_RENDERER_AUTO', 'GSPLAT_RENDERER_RASTER_CPU_SORT', 'GSPLAT_RENDERER_RASTER_GPU_SORT', 'WebGPU'],
  docs: [
    'repo/docs/user-manual/gaussian-splatting/rendering-architecture/renderers.md',
    'repo/docs/user-manual/gaussian-splatting/rendering-architecture/index.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
