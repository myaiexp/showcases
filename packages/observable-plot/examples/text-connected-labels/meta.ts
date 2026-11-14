// observable-plot example: Text: labelling every nth point
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Text: labelling every nth point',
  summary:
    'A connected scatterplot of driving and gas prices where the filter option labels only every nth year.',
  section: 'Mark: Text',
  tags: ['text', 'filter', 'line', 'marker', 'catmull-rom'],
  docs: ['repo/docs/marks/text.md', 'repo/docs/data/driving.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
