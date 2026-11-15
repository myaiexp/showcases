// tanstack-charts example: Same data, different marks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Same data, different marks',
  summary:
    'The same six rows and x/y channels drawn as a line, an area, bars or dots. Only the mark function changes, which shows that the mark picks the geometry.',
  section: 'Grammar of Graphics',
  tags: ['lineY', 'areaY', 'barY', 'dot', 'channels'],
  docs: [
    'repo/docs/concepts/grammar-of-graphics.md',
    'repo/docs/reference/marks/rules-links-arrows-vectors-and-ticks.md',
    'repo/docs/guides/tooltips-and-focus.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
