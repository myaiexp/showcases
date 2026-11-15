// AntV Infographic example: Custom palette: a discrete array registered by name
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom palette: a discrete array registered by name',
  summary:
    'registerPalette stores an array of colours under a name; the syntax then says `palette showcase-sunset` and each item takes the next colour, wrapping round when there are more items than colours. One step shows a three-colour palette across four items, so the wrap is visible.',
  section: 'Custom palettes',
  tags: ['registerPalette', 'palette', 'discrete palette', 'theme palette name'],
  docs: [
    'repo/site/src/content/learn/custom-palette.en.md',
    'repo/site/src/content/reference/infographic-exports.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
    'repo/site/src/content/learn/theme.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
