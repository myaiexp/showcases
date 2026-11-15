// galacean example: OrbitControl damping and speeds
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "OrbitControl damping and speeds",
  summary:
    "Tune how OrbitControl feels: damping gives drags inertia (dampingFactor sets how quickly it dies away), rotateSpeed and zoomSpeed scale the pointer input. The card shows a camera swinging with damping on.",
  section: "Camera",
  tags: ['OrbitControl', 'enableDamping', 'dampingFactor', 'rotateSpeed', 'zoomSpeed'],
  docs: [
    'repo/docs/en/graphics/camera/control.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
