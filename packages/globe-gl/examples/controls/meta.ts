// globe-gl example: Render: controls
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Render: controls",
  summary:
    "controls() returns the Three.js OrbitControls that turn drags and the wheel into camera moves. Their own properties apply directly: auto-rotation and its speed, zoom and rotate switches, damping, and a minimum and maximum camera distance.",
  section: "Render Control",
  tags: ["controls", "OrbitControls", "autoRotate", "minDistance", "maxDistance"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
