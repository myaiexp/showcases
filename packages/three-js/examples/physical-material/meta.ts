// Three.js example: MeshPhysicalMaterial layers driven by sliders
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Clearcoat, sheen and transmission',
  summary:
    'A torus knot in MeshPhysicalMaterial with sliders for clearcoat, sheen, transmission and iridescence, in front of coloured bars so transmission has something to refract.',
  section: 'Fundamentals',
  tags: ['MeshPhysicalMaterial', 'clearcoat', 'sheen', 'transmission', 'iridescence', 'OrbitControls'],
  docs: [
    'repo/docs/pages/MeshPhysicalMaterial.html.md',
    'repo/manual/pages/materials.html',
    'repo/docs/pages/RoomEnvironment.html.md',
    'repo/docs/pages/PMREMGenerator.html.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
