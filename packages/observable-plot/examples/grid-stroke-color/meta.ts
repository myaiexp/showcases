// observable-plot example: Grid: stroke as a channel
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Grid: stroke as a channel',
  summary:
    'A gridX over the values 0 to 100 whose stroke is Plot.identity, so every line takes its color from its tick value on the color scale.',
  section: 'Mark: Grid',
  tags: ['gridX', 'stroke', 'identity', 'scheme'],
  docs: ['repo/docs/marks/grid.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
