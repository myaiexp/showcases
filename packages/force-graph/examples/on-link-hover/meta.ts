// force-graph example: Interaction: onLinkHover
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Interaction: onLinkHover',
  summary:
    'onLinkHover gets the link under the pointer, or null. The hovered link is drawn wider and given four particles; the particle count is only re-read when the prop is set again, so the handler sets it.',
  section: 'Interaction',
  tags: ['onLinkHover', 'linkDirectionalParticles', 'linkWidth', 'linkColor'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
