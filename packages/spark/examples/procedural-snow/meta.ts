// Spark example: generators.snowBox snowfall built from DEFAULT_SNOW
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Procedural snow',
  summary:
    'A snowfall from generators.snowBox, started from the DEFAULT_SNOW parameter set with a larger box, bigger flakes and a minY floor where they linger. A density slider rebuilds the generator, while fallVelocity and wanderScale change the returned dyno values live.',
  section: 'Procedural Splats',
  tags: ['generators', 'snowBox', 'DEFAULT_SNOW', 'density', 'fallVelocity', 'wanderScale', 'minY'],
  docs: ['repo/docs/docs/procedural-splats.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
