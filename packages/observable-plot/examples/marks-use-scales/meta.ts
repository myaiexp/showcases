// observable-plot example: Marks: marks use scales
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Marks: marks use scales',
  summary:
    'The same Apple line on a log or a linear y scale with a fixed domain: changing the scale changes how every mark using it is drawn.',
  section: 'Marks',
  tags: ['y.type', 'y.domain', 'y.grid', 'Plot.lineY'],
  docs: ['repo/docs/features/marks.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
