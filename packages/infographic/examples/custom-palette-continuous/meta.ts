// AntV Infographic example: Custom palette: a function over the item position
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom palette: a function over the item position',
  summary:
    'A palette can be a function. showcase-heat receives the ratio from 0 to 1 and the item index and count, and returns a hex colour blended from blue to red, so the colours spread evenly however many items there are. (It must be a hex string: built-in charts put the colour into a gradient id, and an rgb() or hsl() string breaks the fill.) The steps draw 3, 6 and 9 columns with the same palette name.',
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
