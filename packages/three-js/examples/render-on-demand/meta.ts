// Three.js example: render only when OrbitControls or a resize asks for a frame
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rendering on demand',
  summary:
    'No animation loop at all: a frame is drawn once at the start and again only when OrbitControls fire a change event or the canvas resizes. A counter shows how few frames that costs.',
  section: 'Tips',
  tags: ['OrbitControls', 'change event', 'enableDamping', 'requestAnimationFrame', 'WebGPURenderer'],
  docs: [
    'repo/manual/pages/rendering-on-demand.html',
    'repo/docs/pages/OrbitControls.html.md',
    'repo/docs/pages/Renderer.html.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
