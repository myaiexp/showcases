// g6 example: FAQ: edges that end at a node center
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'FAQ: edges that end at a node center',
  summary: 'Two rect nodes with ports and an edge between them. With portLinkToCenter true the edge runs to the node center instead of stopping at the port.',
  section: 'Further Reading',
  tags: ['portLinkToCenter', 'ports', 'port', 'sourcePort', 'targetPort', 'setNode'],
  docs: [
    'repo/packages/site/docs/manual/faq.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
