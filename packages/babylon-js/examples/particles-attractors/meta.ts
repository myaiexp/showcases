// babylon-js example: Particle attractors and repulsors
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Particle attractors and repulsors',
  summary:
    'A stream of particles bent by two Attractor objects added with addAttractor: one with positive strength orbiting the scene and pulling the stream after it, and one with negative strength pushing particles away. Strengths and the attractor’s position can change any time; removeAttractor takes one out.',
  section: 'Particles',
  tags: ['Attractor', 'addAttractor', 'removeAttractor', 'ParticleSystem'],
  docs: ['repo/content/features/featuresDeepDive/particles/particle_system/attractors.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
