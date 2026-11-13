// babylon-js example: Particle sub emitters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle sub emitters",
  summary:
    "Fireworks: a rocket particle system with an END SubEmitter that spawns a burst system where each rocket particle dies.",
  section: 'Particles',
  tags: ['SubEmitter', 'SubEmitterType.END', 'manualEmitCount', 'ParticleSystem'],
  docs: [
    'repo/content/features/featuresDeepDive/particles/particle_system/subEmitters.md',
    'repo/content/features/featuresDeepDive/particles/particle_system/particle_system_intro.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
