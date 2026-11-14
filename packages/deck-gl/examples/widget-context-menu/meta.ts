// deck-gl example: ContextMenuWidget
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ContextMenuWidget',
  summary:
    'A right-click menu built by getMenuItems from the picked city: a heading, items with icons and values, and one with its own onSelect. onMenuItemSelected marks cities on the map.',
  section: 'Widgets',
  tags: ['ContextMenuWidget', 'getMenuItems', 'onMenuItemSelected', 'ContextWidgetMenuItem', 'icon', 'onSelect', 'placement'],
  docs: [
    'repo/docs/api-reference/widgets/context-menu-widget.md',
    'repo/docs/api-reference/core/widget.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
