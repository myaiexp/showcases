// force-graph example: Link styling: directional particles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link styling: directional particles',
  summary:
    'linkDirectionalParticles puts equally spaced dots on every link that travel from source to target. Their speed is a share of the link length per frame; width and colour have their own accessors. Links with particles keep the canvas redrawing after the layout stops.',
  section: 'Link styling',
  tags: ['linkDirectionalParticles', 'linkDirectionalParticleSpeed', 'linkDirectionalParticleWidth', 'linkDirectionalParticleColor'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
