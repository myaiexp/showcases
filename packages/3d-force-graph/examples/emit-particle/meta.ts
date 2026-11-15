// 3d-force-graph example: Link styling: emitParticle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link styling: emitParticle',
  summary:
    'emitParticle sends one particle along a link once, instead of the cycling particles of linkDirectionalParticles. Click a link to send a particle down it; the card fires them on a timer. The particle styling props apply to emitted ones too.',
  section: 'Link styling',
  tags: ['emitParticle', 'onLinkClick', 'linkDirectionalParticleSpeed'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
