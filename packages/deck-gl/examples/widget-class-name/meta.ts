// deck-gl example: Widget className theming
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Widget className theming',
  summary:
    'The className prop adds a class to a widget root, and a stylesheet sets the widget CSS variables on that class. Two widgets wear the neon class; the fullscreen widget keeps the defaults.',
  section: 'Widgets',
  tags: ['className', 'CSS variables', '--button-size', '--button-shadow', '.deck-widget'],
  docs: [
    'repo/docs/api-reference/widgets/styling.md',
    'repo/docs/api-reference/core/widget.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
