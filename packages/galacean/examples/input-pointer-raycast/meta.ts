// galacean example: Input: raycasting the pointer by hand
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Input: raycasting the pointer by hand",
  summary:
    "The docs' three steps for custom picking: take a pointer, turn its position into a ray with camera.screenPointToRay, and ask scene.physics.raycast for a HitResult. Click the canvas to pick; cards sweep a scripted position.",
  section: "Input",
  tags: ['screenPointToRay', 'Ray', 'HitResult', 'physics', 'raycast', 'Pointer'],
  docs: [
    'repo/docs/en/input/pointer.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
