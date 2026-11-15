// force-graph example: Interaction: hover highlights neighbours
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Interaction: hover highlights neighbours',
  summary:
    'onNodeHover receives the node under the pointer (or null). Its neighbours are collected from the links, and the colour, width and before-mode canvas accessors read that set, so the hovered node, its links and its colleagues stay lit while the rest fades.',
  section: 'Interaction',
  tags: ['onNodeHover', 'nodeCanvasObjectMode', 'nodeCanvasObject', 'linkWidth', 'linkColor', 'autoPauseRedraw'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
