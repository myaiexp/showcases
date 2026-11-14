// vchart example: Theme: the ThemeManager registry
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Theme: the ThemeManager registry",
  summary:
    "registerTheme, themeExist, getTheme and removeTheme on VChart.ThemeManager, with a readout of what the registry holds. A throwaway theme is registered, applied to the chart with the instance method and removed again.",
  section: "Theme",
  tags: ['ThemeManager.themes','themeExist','getTheme','removeTheme'],
  docs: [
    "repo/docs/assets/api/en/API/theme.md",
    "repo/docs/assets/guide/en/tutorial_docs/Theme/Apply_Theme.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
