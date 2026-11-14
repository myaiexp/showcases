// playcanvas example: GPU frame time
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'GPU frame time',
  summary:
    "GPU profiling is off by default: set app.graphicsDevice.gpuProfiler.enabled = true, render some frames, then read app.stats.gpuFrameTime. It is undefined when the profiler is disabled or the device cannot time (WebGL 2 needs EXT_disjoint_timer_query_webgl2, WebGPU needs timestamp-query), and that is not the same as zero. A stack of screen-sized blended layers makes the GPU time follow overdraw (fill rate); the readout prints the backend, the profiler state and the value or its absence.",
  section: 'Debugging and Optimization',
  tags: ['GpuProfiler', 'gpuProfiler.enabled', 'gpuFrameTime', 'AppStats', 'drawCallCount', 'overdraw'],
  docs: ['repo/docs/user-manual/optimization/app-stats.md', 'repo/docs/user-manual/optimization/mini-stats.md', 'repo/docs/user-manual/optimization/gpu-profiling.md', 'repo/docs/user-manual/optimization/guidelines.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
