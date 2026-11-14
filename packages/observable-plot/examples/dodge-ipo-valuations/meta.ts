// observable-plot example: Dodge: IPO valuation bubbles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dodge: IPO valuation bubbles',
  summary:
    'Twenty years of IPOs as dots sized by valuation (the r channel) and dodged in y by date; labels on the large ones come from a filtered text mark.',
  section: 'Transform: Dodge',
  tags: ['dot', 'text', 'dodgeY', 'r', 'filter'],
  docs: ['repo/docs/transforms/dodge.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
