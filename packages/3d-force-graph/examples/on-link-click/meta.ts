// 3d-force-graph example: Interaction: onLinkClick
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Interaction: onLinkClick",
  summary:
    "onLinkClick receives the clicked link. The selected link turns red and thick through the linkColor and linkWidth accessors; links are thin cylinders so they are easy to hit.",
  section: "Interaction",
  tags: ['onLinkClick', 'linkColor', 'linkWidth', 'linkLabel'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
