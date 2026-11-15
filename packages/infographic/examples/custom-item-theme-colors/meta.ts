// AntV Infographic example: Custom item: every themeColors field
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom item: every themeColors field',
  summary:
    'SwatchItem draws one chip for each field of the themeColors prop an item receives: colorPrimary, colorPrimaryBg, colorPrimaryText, colorText, colorTextSecondary and colorBgElevated. The steps change colorPrimary and the background so you can see how the derived colours follow, including in a light theme.',
  section: 'Custom items',
  tags: ['registerItem', 'themeColors', 'ThemeColors', 'colorPrimary', 'colorBg', 'getThemeColors'],
  docs: [
    'repo/site/src/content/learn/custom-items.en.md',
    'repo/skills/infographic-item-creator/references/item-prompt.md',
    'repo/site/src/content/reference/infographic-exports.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
    'repo/site/src/content/learn/theme.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
