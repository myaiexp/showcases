// zephyr3d example: ParticleMaterial: maps and blending
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ParticleMaterial: maps and blending',
  summary:
    'The default ParticleMaterial of a cone emitter: alphaMap sets the particle shape, rampMap colours and fades it over lifetime, aspect stretches the quad, jitterPower distorts it, directional aligns it with the velocity, and blendMode picks additive or blend. Three presets (flame, smoke, sparks) swap the maps.',
  section: 'Basic Framework',
  tags: ['ParticleMaterial', 'alphaMap', 'rampMap', 'aspect', 'jitterPower', 'directional', 'blendMode', 'ParticleSystem'],
  docs: ['repo/apps/doc/web/en/particles-sprites.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
