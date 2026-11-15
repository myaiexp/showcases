// AntV Infographic example: Custom structure: a colour per item from the palette
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom structure: a colour per item from the palette',
  summary:
    'Stairs raises each item one step higher and gives it its own colour: getPaletteColor reads the theme palette for the item index and getThemeColors turns it into the themeColors prop the item expects. The steps switch the palette in the theme block.',
  section: 'Custom structures',
  tags: ['registerStructure', 'getPaletteColor', 'getThemeColors', 'themeColors', 'palette'],
  docs: [
    'repo/site/src/content/learn/custom-structure.en.md',
    'repo/skills/infographic-structure-creator/references/structure-prompt.md',
    'repo/site/src/content/reference/infographic-exports.en.md',
    'repo/site/src/content/learn/theme.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
