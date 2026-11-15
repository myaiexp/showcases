// zephyr3d example: Dense particles with weighted OIT
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dense particles with weighted OIT',
  summary:
    'Two overlapping clouds of alpha-blended particles, one red and one blue. Switching camera.oitMode from none to weighted (weighted blended order-independent transparency) removes the sorting artefacts where they mix.',
  section: 'Basic Framework',
  tags: ['ParticleSystem', 'camera.oitMode', 'weighted', 'blendMode', 'ParticleMaterial'],
  docs: ['repo/apps/doc/web/en/particles-sprites.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
