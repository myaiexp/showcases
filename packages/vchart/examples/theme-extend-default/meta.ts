// vchart example: Theme: extend a built-in theme
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Theme: extend a built-in theme",
  summary:
    "ThemeManager.getTheme returns the built-in dark or light theme; spreading it into a new object and overriding the palette, bar width and axis label size gives a registered theme that setCurrentTheme applies.",
  section: "Theme",
  tags: ['ThemeManager.getTheme','getDefaultTheme','registerTheme','setCurrentTheme'],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Theme/Apply_Theme.md",
    "repo/docs/assets/api/en/API/theme.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
