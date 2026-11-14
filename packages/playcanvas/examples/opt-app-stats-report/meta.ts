// playcanvas example: AppStats report
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'AppStats report',
  summary:
    "app.stats exposes the engine's measurements as getters with no overlay: frameTime, cpuUpdateTime and cpuRenderTime, drawCallCount, gpuFrameTime, primitiveCount and the vram byte counts. A frameend listener accumulates them and publishes an average and peak report every 500 ms, as the docs' sampler does, into a readout over the canvas. Unavailable values stay n/a rather than reading as zero: the GPU time until profiling is on and supported, primitives outside debug builds. Add boxes and toggle shadows to watch draw calls and CPU time move.",
  section: 'Debugging and Optimization',
  tags: ['AppStats', 'frameTime', 'cpuUpdateTime', 'cpuRenderTime', 'drawCallCount', 'gpuFrameTime', 'primitiveCount', 'vramTotalBytes', 'frameend'],
  docs: ['repo/docs/user-manual/optimization/app-stats.md', 'repo/docs/user-manual/optimization/index.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
