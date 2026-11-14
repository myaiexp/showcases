// observable-plot example: Marks: a channel with a transform method
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Marks: a channel with a transform method',
  summary:
    'A channel given as an object with a transform method, which receives the whole data array once, rather than a function called per datum.',
  section: 'Marks',
  tags: ['transform', 'Plot.dot', 'Plot.identity'],
  docs: ['repo/docs/features/marks.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
