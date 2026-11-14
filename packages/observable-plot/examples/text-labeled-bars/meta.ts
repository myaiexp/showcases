// observable-plot example: Text: labelled bars
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Text: labelled bars',
  summary:
    'A text mark prints each bar\'s value above it, using dy and lineAnchor bottom. The slider moves the labels.',
  section: 'Mark: Text',
  tags: ['text', 'dy', 'lineAnchor', 'barY'],
  docs: ['repo/docs/marks/text.md', 'repo/docs/data/alphabet.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
