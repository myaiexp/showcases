// zephyr3d example: Predefined shapes: sphere, box, plane, cylinder
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Predefined shapes: sphere, box, plane, cylinder',
  summary:
    'The four primitives Mesh accepts out of the box, each with a LambertMaterial. Sliders change a shape\'s creation options (sphere detail, cylinder topRadius and radialDetail) after the fact.',
  section: 'Basic Framework',
  tags: ['SphereShape', 'BoxShape', 'PlaneShape', 'CylinderShape', 'Mesh', 'LambertMaterial'],
  docs: ['repo/apps/doc/web/en/mesh-material.md', 'repo/apps/doc/src/tut-5/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
