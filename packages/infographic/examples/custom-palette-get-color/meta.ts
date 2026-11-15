// AntV Infographic example: Custom palette: getPaletteColor samples a palette
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom palette: getPaletteColor samples a palette',
  summary:
    'getPaletteColor(name, indexes, total) answers which colour an item gets. The side panel lists its answers for a function palette and an array palette next to the chart that uses them, so you can read the numbers behind each colour. The steps switch the palette and the number of items.',
  section: 'Custom palettes',
  tags: ['getPaletteColor', 'registerPalette', 'getPalette', 'indexes', 'total'],
  docs: [
    'repo/site/src/content/learn/custom-palette.en.md',
    'repo/site/src/content/reference/infographic-exports.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
