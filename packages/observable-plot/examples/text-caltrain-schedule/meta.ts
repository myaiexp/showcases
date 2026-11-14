// observable-plot example: Text: stem-and-leaf train schedule
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Text: stem-and-leaf train schedule',
  summary:
    'Caltrain minutes drawn as stacked text with stackX2, coloured by train type, with hour labels and Northbound and Southbound headings.',
  section: 'Mark: Text',
  tags: ['text', 'stackX2', 'point scale', 'fill'],
  docs: ['repo/docs/marks/text.md', 'repo/docs/data/caltrain.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
