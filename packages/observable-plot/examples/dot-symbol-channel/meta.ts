// observable-plot example: Dot: symbol channel
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dot: symbol channel',
  summary:
    'Penguin species encoded by the symbol channel, by color, or both. The symbol scale gives readers with color vision deficiency a second cue.',
  section: 'Mark: Dot',
  tags: ['dot', 'symbol', 'stroke', 'legend'],
  docs: ['repo/docs/marks/dot.md', 'repo/docs/data/penguins.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
