// galacean example: Basics: the core packages together
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Basics: the core packages together",
  summary:
    "The runtime packages from the overview table working in one scene: @galacean/engine drawing the scene, @galacean/engine-physics-physx dropping bodies, and @galacean/engine-toolkit-controls' OrbitControl turning the camera.",
  section: "Basics",
  tags: ['WebGLEngine', 'PhysXPhysics', 'DynamicCollider', 'OrbitControl', 'Camera'],
  docs: [
    'repo/docs/en/basics/overview.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
