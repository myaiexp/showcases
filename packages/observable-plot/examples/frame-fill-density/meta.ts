// observable-plot example: Frame: fill as a value
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Frame: fill as a value',
  summary:
    'A density heatmap of Old Faithful eruptions where the frame is filled with the value 0, so the color scale paints the empty area with the zero-density color.',
  section: 'Mark: Frame',
  tags: ['frame', 'fill', 'density'],
  docs: ['repo/docs/marks/frame.md', 'repo/docs/data/faithful.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
