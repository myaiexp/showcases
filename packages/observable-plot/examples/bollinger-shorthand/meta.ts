// observable-plot example: Bollinger: an array of numbers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bollinger: an array of numbers',
  summary:
    'Given a plain array of closes, bollingerY uses the zero-based index as x; here the color, opacity and strokeWidth options restyle the mark.',
  section: 'Mark: Bollinger',
  tags: ['bollingerY', 'color', 'opacity', 'strokeWidth'],
  docs: ['repo/docs/marks/bollinger.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
