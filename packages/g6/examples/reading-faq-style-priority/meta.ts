// g6 example: FAQ: style in data versus style mapping
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'FAQ: style in data versus style mapping',
  summary: 'A fill in the node data loses to node.style.fill. Switching node.style to a callback that reads data.style.fill first gives the data priority. The toggle swaps the two.',
  section: 'Further Reading',
  tags: ['node.style', 'style callback', 'setNode', 'data.style'],
  docs: [
    'repo/packages/site/docs/manual/faq.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
