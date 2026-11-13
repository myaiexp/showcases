// babylon-js example: GPU particle system
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'GPU particle system',
  summary:
    'A GPUParticleSystem with a capacity of 300,000 and a smaller randomTextureSize, animated by WebGL2 transform feedback instead of the CPU. It uses the same emitter, colour and power settings as a ParticleSystem, which is the fallback when GPUParticleSystem.IsSupported is false; activeParticleCount limits how many particles run.',
  section: 'Particles',
  tags: ['GPUParticleSystem', 'IsSupported', 'activeParticleCount', 'randomTextureSize'],
  docs: ['repo/content/features/featuresDeepDive/particles/particle_system/gpu_particles.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
