// zephyr3d example: Particles in world or local space
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Particles in world or local space',
  summary:
    'An emitter flying a figure of eight. With worldSpace on, the particles it has already emitted stay where they were and trail behind it; with it off they stay in the emitter\'s local space and move with the node.',
  section: 'Basic Framework',
  tags: ['ParticleSystem', 'worldSpace', 'emitInterval', 'ParticleMaterial'],
  docs: ['repo/apps/doc/web/en/particles-sprites.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
