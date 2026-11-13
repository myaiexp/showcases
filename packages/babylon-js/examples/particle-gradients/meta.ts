// babylon-js example: Particle system with gradients
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle system with gradients",
  summary:
    "A flame ParticleSystem with a flare texture drawn in code, colour gradients and size gradients over each particle lifetime.",
  section: 'Particles',
  tags: ['ParticleSystem', 'addColorGradient', 'addSizeGradient', 'createConeEmitter'],
  docs: [
    'repo/content/features/featuresDeepDive/particles/particle_system/particle_system_intro.md',
    'repo/content/features/featuresDeepDive/particles/particle_system/tuning_gradients.md',
    'repo/content/features/featuresDeepDive/particles/particle_system/shape_emitters.md',
    'repo/content/features/featuresDeepDive/particles/particle_system/ramps_and_blends.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
