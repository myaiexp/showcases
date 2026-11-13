// Three.js example: the manual's first scene, a spinning cube
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Your first scene',
  summary:
    'The smallest complete three.js app: a Scene, a PerspectiveCamera and a WebGPURenderer, with a BoxGeometry mesh rotated inside setAnimationLoop.',
  section: 'Getting Started',
  tags: ['Scene', 'PerspectiveCamera', 'WebGPURenderer', 'BoxGeometry', 'setAnimationLoop'],
  docs: [
    'repo/manual/pages/creating-a-scene.html',
    'repo/manual/pages/webgpurenderer.html',
    'repo/manual/pages/responsive.html',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
