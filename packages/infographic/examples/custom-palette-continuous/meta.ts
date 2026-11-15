// AntV Infographic example: Custom palette: a function over the item position
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom palette: a function over the item position',
  summary:
    'A palette can be a function. showcase-heat receives the ratio from 0 to 1 and the item index and count, and returns an hsl colour, so the colours spread evenly however many items there are. The steps draw 3, 6 and 9 columns with the same palette name.',
  section: 'Custom palettes',
  tags: ['registerPalette', 'continuous palette', 'ratio', 'palette function'],
  docs: [
    'repo/site/src/content/learn/custom-palette.en.md',
    'repo/site/src/content/reference/infographic-exports.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
    'repo/site/src/content/learn/theme.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
