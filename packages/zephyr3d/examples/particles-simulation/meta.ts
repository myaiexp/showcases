// zephyr3d example: Particle simulation settings
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Particle simulation settings',
  summary:
    'A smoke plume with every simulation knob on a slider: emitInterval and emitCount, particle life, velocity and acceleration, start and end size (particleSize1 and 2), rotation, gravity, wind and airResistence.',
  section: 'Basic Framework',
  tags: ['ParticleSystem', 'emitInterval', 'emitCount', 'particleLifeMax', 'particleVelocityMax', 'particleSize1Max', 'particleSize2Max', 'gravity', 'wind', 'airResistence', 'particleAccelMax', 'particleRotationMax'],
  docs: ['repo/apps/doc/web/en/particles-sprites.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
