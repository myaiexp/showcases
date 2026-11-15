// tanstack-charts example: Field and accessor channels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Field and accessor channels',
  summary:
    'A scatter where x is a field name and y is an accessor dividing two fields. The toggle swaps the accessor for a plain count.',
  section: 'Data and Channels',
  tags: ['dot', 'x', 'y', 'accessor channel'],
  docs: [
    'repo/docs/concepts/data-and-channels.md',
    'repo/docs/concepts/grammar-of-graphics.md',
    'repo/docs/guides/tooltips-and-focus.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
