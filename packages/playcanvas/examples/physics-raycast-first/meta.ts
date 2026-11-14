// playcanvas example: raycastFirst and picking
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'raycastFirst and picking',
  summary:
    'A scanner sweeps a ray across a field of pillars and falling balls and asks the rigidbody system for the closest hit with raycastFirst, drawing the ray to the hit point plus the surface normal and highlighting the entity. In the full view, hovering the canvas switches to the docs\' picking recipe: the ray runs from the camera to the pointer projected onto the far clip plane with screenToWorld.',
  section: 'Physics',
  tags: ['raycastFirst', 'RaycastResult', 'screenToWorld', 'farClip', 'drawLine', 'hitFraction'],
  docs: ['repo/docs/user-manual/physics/ray-casting.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
