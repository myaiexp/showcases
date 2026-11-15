// d2 example: darkThemeID follows the system
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'darkThemeID follows the system',
  summary:
    'Setting `darkThemeID` next to `themeID` makes the SVG carry both colour sets. A CSS media query on `prefers-color-scheme: dark` picks between them, so the same file adapts to the viewer. The caption reports whether the media query is in the SVG.',
  section: 'Themes',
  tags: ['theme', 'darkThemeID', 'dark mode'],
  docs: ['repo/docs/tour/themes.md', 'repo/blog/dark_mode.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
