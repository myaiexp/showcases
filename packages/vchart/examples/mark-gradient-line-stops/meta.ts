// vchart example: A line gradient with a hard colour split
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A line gradient with a hard colour split',
  summary:
    'The line stroke is a linear gradient whose stops repeat one offset to switch colour at once: green above a chosen value, red below. The offset is worked out from the data maximum and minimum as the guide describes, and a slider moves the split.',
  section: 'Concepts: Series, Marks and Data',
  tags: ['gradient: linear', 'stops', 'line.style.stroke', 'x0 y0 x1 y1'],
  docs: ['repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Series/Mark.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
