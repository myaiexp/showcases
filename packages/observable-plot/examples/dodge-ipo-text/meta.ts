// observable-plot example: Dodge: valuation text
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dodge: valuation text',
  summary:
    'The text mark works with dodgeY too: IPO valuations in billions, with the font size growing with the valuation.',
  section: 'Transform: Dodge',
  tags: ['text', 'dodgeY', 'r', 'fontSize'],
  docs: ['repo/docs/transforms/dodge.md', 'repo/docs/marks/text.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
