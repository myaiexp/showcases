// g6 example: FAQ: take a node out of its combo
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'FAQ: take a node out of its combo',
  summary: 'updateNodeData([{ id, combo: null }]) detaches a node from its parent combo. The combo shrinks to the nodes that remain.',
  section: 'Further Reading',
  tags: ['updateNodeData', 'combo', 'combo: null'],
  docs: [
    'repo/packages/site/docs/manual/faq.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
