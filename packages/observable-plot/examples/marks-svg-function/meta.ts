// observable-plot example: Marks: an SVG function as a mark
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Marks: an SVG function as a mark',
  summary:
    'A function in marks that returns an SVG defs element, so bars can fill with url(#gradient).',
  section: 'Marks',
  tags: ['marks', 'function mark', 'Plot.barY', 'fill'],
  docs: ['repo/docs/features/marks.md', 'repo/docs/data/alphabet.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
