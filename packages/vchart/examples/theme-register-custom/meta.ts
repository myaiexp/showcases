// vchart example: Theme: register a custom theme
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Theme: register a custom theme",
  summary:
    "A custom theme (palette, bar width and labels, axis font, rounded bars) is registered with ThemeManager.registerTheme and applied to the chart by name through the constructor's theme option.",
  section: "Theme",
  tags: ['ThemeManager.registerTheme','theme','colorScheme','markByName','series.bar'],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Theme/Customize_Theme.md",
    "repo/docs/assets/guide/en/tutorial_docs/Theme/Theme.md",
    "repo/docs/assets/api/en/API/theme.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
