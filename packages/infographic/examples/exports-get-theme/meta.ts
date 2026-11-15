// AntV Infographic example: Exports: getTheme() returns a theme's ThemeConfig
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Exports: getTheme() returns a theme's ThemeConfig",
  summary:
    "getTheme(name) returns the ThemeConfig registered under a name, or undefined. The card prints the object for each built-in theme next to the infographic drawn with that theme; asking for 'default' (the name the docs use) comes back undefined, because the built-in light theme is registered as 'light'.",
  section: "Exports",
  tags: ["getTheme", "ThemeConfig", "dark", "hand-drawn"],
  docs: ["repo/site/src/content/reference/infographic-exports.en.md", "repo/site/src/content/reference/built-in-themes.en.md", "repo/site/src/content/reference/infographic-types.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
