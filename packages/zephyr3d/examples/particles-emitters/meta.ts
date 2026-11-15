// zephyr3d example: Particle emitter shapes and behaviour
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Particle emitter shapes and behaviour',
  summary:
    'One ParticleSystem switched between the five emitterShape values (point, sphere, box, cylinder, cone) and between emitterBehavior surface and volume. The emitter size is drawn between emitterShapeSizeMin and emitterShapeSizeMax.',
  section: 'Basic Framework',
  tags: ['ParticleSystem', 'emitterShape', 'emitterBehavior', 'emitterShapeSizeMin', 'emitterShapeSizeMax', 'emitterConeRadiusMax', 'ParticleMaterial'],
  docs: ['repo/apps/doc/web/en/particles-sprites.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
