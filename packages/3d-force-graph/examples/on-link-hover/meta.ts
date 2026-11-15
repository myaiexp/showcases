// 3d-force-graph example: Interaction: onLinkHover
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Interaction: onLinkHover",
  summary:
    "onLinkHover receives the link under the pointer (or null). The linkDirectionalParticles accessor gives only the hovered link particles, and its colour and width change too.",
  section: "Interaction",
  tags: ['onLinkHover', 'linkDirectionalParticles', 'linkColor', 'linkWidth'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
