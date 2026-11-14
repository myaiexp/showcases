// deck-gl example: Widget CSS variables
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Widget CSS variables',
  summary:
    'Start from DarkTheme and override --button-size, --button-corner-radius, --widget-margin and the button colours through the widget style prop. Sliders rewrite the variables live.',
  section: 'Widgets',
  tags: ['style', '--button-size', '--button-corner-radius', '--widget-margin', '--button-background'],
  docs: [
    'repo/docs/api-reference/widgets/styling.md',
    'repo/docs/api-reference/core/widget.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
