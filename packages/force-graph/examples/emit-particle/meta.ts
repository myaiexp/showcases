// force-graph example: Link styling: emitParticle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link styling: emitParticle',
  summary:
    'emitParticle(link) sends one non-repeating particle along a link, in the link\'s own particle style. Clicking a link in onLinkClick emits one; the card emits along random links on a timer.',
  section: 'Link styling',
  tags: ['emitParticle', 'onLinkClick', 'onLinkHover', 'linkDirectionalParticleWidth', 'linkDirectionalParticleSpeed', 'linkHoverPrecision'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
