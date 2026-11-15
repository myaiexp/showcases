// zephyr3d example: Particle bursts with newParticle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Particle bursts with newParticle',
  summary:
    'A ParticleSystem emitting a single particle per second, with one-shot bursts triggered by newParticle(count, worldMatrix) at changing positions: the way to make impacts and explosions.',
  section: 'Basic Framework',
  tags: ['ParticleSystem', 'newParticle', 'worldMatrix', 'emitInterval', 'emitCount', 'gravity'],
  docs: ['repo/apps/doc/web/en/particles-sprites.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
