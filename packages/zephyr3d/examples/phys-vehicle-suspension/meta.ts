// zephyr3d example: Suspension tuning: stiffness and damping
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Suspension tuning: stiffness and damping',
  summary:
    'Three identical cars cross speed bumps with soft, default and stiff springs (suspensionStiffness, suspensionCompression, suspensionRelaxation). Sliders change the default car\'s springs while it drives.',
  section: 'Physics',
  tags: ['Wheel', 'suspensionStiffness', 'suspensionCompression', 'suspensionRelaxation', 'Vehicle'],
  docs: ['repo/apps/doc/web/en/physics-vehicle.md', 'repo/apps/doc/src/tut-81/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
