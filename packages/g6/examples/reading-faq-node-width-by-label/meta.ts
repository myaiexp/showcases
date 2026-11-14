// g6 example: FAQ: node width from the label length
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'FAQ: node width from the label length',
  summary: 'node.style.size as a callback that measures the label text with a canvas 2D context, so each node is as wide as its text plus padding. Pick a font size to remeasure.',
  section: 'Further Reading',
  tags: ['node.style.size', 'labelText', 'measureText', 'setNode'],
  docs: [
    'repo/packages/site/docs/manual/faq.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
