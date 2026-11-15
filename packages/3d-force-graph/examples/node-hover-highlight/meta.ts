// 3d-force-graph example: Interaction: hover highlights neighbours
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Interaction: hover highlights neighbours',
  summary:
    'onNodeHover receives the node under the pointer (or null). Its neighbours are collected from the links, and the colour and width accessors read that set, so the hovered node, its links and its colleagues light up. The accessors are set again on every hover, since they are only re-read when a prop changes.',
  section: 'Interaction',
  tags: ['onNodeHover', 'nodeColor', 'linkWidth', 'linkColor', 'nodeLabel'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
