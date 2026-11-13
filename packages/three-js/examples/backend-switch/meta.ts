// Three.js example: reading renderer.backend and forcing the WebGL 2 fallback
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'WebGPU or WebGL 2 backend',
  summary:
    'WebGPURenderer uses WebGPU when the browser has it and falls back to WebGL 2 otherwise. This reads which backend it picked from renderer.backend and rebuilds the renderer with forceWebGL on demand.',
  section: 'WebGPU',
  tags: ['WebGPURenderer', 'forceWebGL', 'backend', 'init'],
  docs: [
    'repo/manual/pages/webgpurenderer.html',
    'repo/docs/pages/WebGPURenderer.html.md',
    'repo/docs/pages/Renderer.html.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
