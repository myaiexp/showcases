// 3d-force-graph example: Link styling: particle width
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link styling: particle width',
  summary:
    'linkDirectionalParticleWidth is the diameter of each travelling particle in scene units, from a constant, an attribute or a function. Unlike speed it is applied when the particles are built, so the accessor is set again after each change.',
  section: 'Link styling',
  tags: ['linkDirectionalParticleWidth', 'linkDirectionalParticles'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
