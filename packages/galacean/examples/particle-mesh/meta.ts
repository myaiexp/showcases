// galacean example: Particle mesh render mode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle mesh render mode",
  summary:
    "ParticleRenderMode.Mesh draws a cuboid mesh per particle with random 3D start rotation and a spin over lifetime. A checkbox switches back to Billboard in the full view.",
  section: "Particle",
  tags: ['ParticleRenderMode.Mesh', 'ParticleRenderer.mesh', 'startRotation3D'],
  docs: [
    'repo/docs/en/graphics/particle/renderer.mdx',
    'repo/docs/en/graphics/particle/renderer-main-module.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
