// mermaid example: Packet header layouts and bit order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Packet header layouts and bit order',
  summary:
    'Packet diagrams: a TCP header by bit ranges, a UDP header with the +N bit-count shorthand, and a hardware register with bitOrder descending.',
  section: 'Packet',
  tags: ['packet', 'bit ranges', 'bitOrder', 'showBits'],
  docs: ['repo/packages/mermaid/src/docs/syntax/packet.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
