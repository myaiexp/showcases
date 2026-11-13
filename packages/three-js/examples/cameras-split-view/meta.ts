// Three.js example: one scene drawn through two cameras with scissor and viewport
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Perspective vs orthographic',
  summary:
    'One canvas, two views drawn with setScissor and setViewport. The left view looks through a PerspectiveCamera or an OrthographicCamera; the right view orbits the scene and draws that camera\'s frustum with a CameraHelper.',
  section: 'Fundamentals',
  tags: ['PerspectiveCamera', 'OrthographicCamera', 'CameraHelper', 'setScissor', 'setViewport', 'OrbitControls'],
  docs: [
    'repo/manual/pages/cameras.html',
    'repo/docs/pages/CameraHelper.html.md',
    'repo/docs/pages/OrthographicCamera.html.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
