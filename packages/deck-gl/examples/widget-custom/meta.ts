// deck-gl example: A custom widget
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Writing a custom widget',
  summary:
    'A Widget subclass with its own defaultProps, className and placement. onViewportChange keeps a live longitude, latitude and zoom readout and onClick records the last city clicked; both call updateHTML to render.',
  section: 'Widgets',
  tags: ['Widget', 'WidgetProps', 'onViewportChange', 'onClick', 'onRenderHTML', 'updateHTML', 'defaultProps', 'className'],
  docs: [
    'repo/docs/api-reference/core/widget.md',
    'repo/docs/api-reference/widgets/overview.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
