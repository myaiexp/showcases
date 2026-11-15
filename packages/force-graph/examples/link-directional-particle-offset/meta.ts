// force-graph example: Link styling: particle offset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link styling: particle offset',
  summary:
    'linkDirectionalParticleOffset, a value from 0 to 1, shifts a particle\'s starting point along its link. Here each link gets a different share, so the particles start staggered instead of all leaving the source together. It is read when particles are created, which setting linkDirectionalParticles again does.',
  section: 'Link styling',
  tags: ['linkDirectionalParticleOffset', 'linkDirectionalParticles', 'linkDirectionalParticleSpeed', 'linkDirectionalParticleColor'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
