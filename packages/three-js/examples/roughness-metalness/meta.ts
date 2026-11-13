// Three.js example: MeshStandardMaterial roughness against metalness, lit by a room environment
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Roughness and metalness grid',
  summary:
    'A grid of MeshStandardMaterial spheres: roughness steps from 0 to 1 across, metalness from 0 to 1 down. A RoomEnvironment baked by PMREMGenerator gives the metals something to reflect.',
  section: 'Fundamentals',
  tags: ['MeshStandardMaterial', 'roughness', 'metalness', 'PMREMGenerator', 'RoomEnvironment', 'scene.environment'],
  docs: [
    'repo/manual/pages/materials.html',
    'repo/docs/pages/MeshStandardMaterial.html.md',
    'repo/docs/pages/PMREMGenerator.html.md',
    'repo/docs/pages/RoomEnvironment.html.md',
    'repo/docs/pages/Scene.html.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
