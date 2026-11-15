// AntV Infographic example: Custom item: a gradient defined in Defs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom item: a gradient defined in Defs',
  summary:
    'GradientCard declares a linearGradient inside Defs and fills a Rect with url(#id). The id is built from the item indexes so every card has its own definition, as the item guide warns, and the stops come from themeColors, so changing the theme primary colour recolours the cards.',
  section: 'Custom items',
  tags: ['registerItem', 'Defs', 'linearGradient', 'themeColors', 'colorPrimary', 'indexes'],
  docs: [
    'repo/site/src/content/learn/custom-items.en.md',
    'repo/skills/infographic-item-creator/references/item-prompt.md',
    'repo/site/src/content/reference/infographic-exports.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
