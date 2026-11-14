// observable-plot example: Transforms: Plot.indexOf and Plot.identity
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Transforms: Plot.indexOf and Plot.identity',
  summary:
    'Channel helpers over a plain array: Plot.indexOf supplies 0, 1, 2, … for x and Plot.identity returns the numbers as y.',
  section: 'Transforms',
  tags: ['indexOf', 'identity', 'lineY', 'dot'],
  docs: ['repo/docs/features/transforms.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
