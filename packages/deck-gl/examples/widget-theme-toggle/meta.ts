// deck-gl example: ThemeWidget
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ThemeWidget',
  summary:
    'A ThemeWidget flips all widgets between the built-in dark and light glass themes. It runs uncontrolled from initialThemeMode and reports each switch through onThemeModeChange.',
  section: 'Widgets',
  tags: ['ThemeWidget', 'initialThemeMode', 'onThemeModeChange', 'darkModeTheme', 'lightModeTheme'],
  docs: [
    'repo/docs/api-reference/widgets/theme-widget.md',
    'repo/docs/api-reference/widgets/styling.md',
    'repo/docs/api-reference/widgets/overview.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
