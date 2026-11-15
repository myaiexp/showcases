// AntV Infographic example: Themes: a palette as a function
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Themes: a palette as a function',
  summary:
    'A palette can be a function, like a d3 colour interpolator, registered under a name. This one turns the item ratio into a blue-to-violet hue, so when the number of items grows the gradient is spread over more items.',
  section: 'Themes',
  tags: ['registerPalette', 'palette', 'function', 'ratio'],
  docs: [
    'repo/site/src/content/learn/theme.en.md',
    'repo/site/src/content/reference/infographic-exports.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
