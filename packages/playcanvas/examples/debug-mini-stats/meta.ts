// playcanvas example: MiniStats overlay
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'MiniStats overlay',
  summary:
    "MiniStats is the engine's performance overlay: frame time, draw calls, CPU and GPU timings and an estimate of GPU memory, with graphs in its large view. It is created after the application starts from MiniStats.getDefaultOptions(), here with 60 FPS watermarks on the CPU and GPU graphs. The full view changes its size and collapses its Engine, CPU, GPU and VRAM sections from code, adds spheres to push the draw call count up, and allocates and releases 1024-pixel textures to move the VRAM total.",
  section: 'Debugging and Optimization',
  tags: ['MiniStats', 'getDefaultOptions', 'activeSizeIndex', 'engineCollapsed', 'cpuCollapsed', 'gpuCollapsed', 'vramCollapsed', 'enabled', 'watermark'],
  docs: ['repo/docs/user-manual/optimization/mini-stats.md', 'repo/docs/user-manual/optimization/index.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
