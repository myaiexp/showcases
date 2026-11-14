// observable-plot example: Bar: civilizations timeline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bar: civilizations timeline',
  summary:
    'With x1 and x2 set, barX opts out of stacking and spans each civilization from start to end; a text mark labels the bars in place of the y axis.',
  section: 'Mark: Bar',
  tags: ['barX', 'x1', 'x2', 'text', 'tickFormat', 'sort'],
  docs: ['repo/docs/marks/bar.md', 'repo/docs/data/civilizations.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
