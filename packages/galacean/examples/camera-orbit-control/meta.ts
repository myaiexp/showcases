// galacean example: OrbitControl
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "OrbitControl",
  summary:
    "OrbitControl from the camera toolkit added to the camera entity after the Camera: it orbits a target, with drag to rotate, wheel to zoom and right-drag to pan in the full view, and autoRotate turning it on its own in the card.",
  section: "Camera",
  tags: ['OrbitControl', 'autoRotate', 'autoRotateSpeed', 'target'],
  docs: [
    'repo/docs/en/graphics/camera/control.mdx',
    'repo/docs/en/graphics/camera/component.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
