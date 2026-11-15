// 3d-force-graph example: Link styling: custom particle objects
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link styling: custom particle objects',
  summary:
    'linkDirectionalParticleThreeObject replaces the particle spheres with any object you build: a small box, a cone that points along the link, or a diamond. Only the geometry and material of the returned object are used for the cycling particles, and width, colour and resolution are ignored.',
  section: 'Link styling',
  tags: ['linkDirectionalParticleThreeObject', 'linkDirectionalParticles'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
