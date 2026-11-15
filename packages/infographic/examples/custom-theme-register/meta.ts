// AntV Infographic example: Custom theme: registerTheme and use it by name
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom theme: registerTheme and use it by name',
  summary:
    'registerTheme stores a theme config under a name, and `theme showcase-ember` in the syntax applies it. A registered theme is only a starting point: the third step adds a colorPrimary line under the theme name, which overrides that one field.',
  section: 'Custom themes',
  tags: ['registerTheme', 'ThemeConfig', 'colorBg', 'colorPrimary', 'base.text.fill'],
  docs: [
    'repo/site/src/content/learn/custom-theme.en.md',
    'repo/site/src/content/reference/infographic-exports.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
    'repo/site/src/content/learn/theme.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
