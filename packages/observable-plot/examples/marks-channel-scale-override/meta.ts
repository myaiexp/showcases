// observable-plot example: Marks: overriding a channel scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Marks: overriding a channel scale',
  summary:
    'A stroke channel given as {value, scale}: scale null reads the strings as literal colors, scale "color" encodes them as categories.',
  section: 'Marks',
  tags: ['stroke', 'scale: null', 'scale: "color"', 'Plot.dot'],
  docs: ['repo/docs/features/marks.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
