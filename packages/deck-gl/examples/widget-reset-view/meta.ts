// deck-gl example: ResetViewWidget
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ResetViewWidget',
  summary:
    'A button that flies the map back to a home view given as the widget initialViewState (a transition included), with a custom label. The map starts over Tokyo so the jump is easy to see.',
  section: 'Widgets',
  tags: ['ResetViewWidget', 'initialViewState', 'label', 'onReset'],
  docs: [
    'repo/docs/api-reference/widgets/reset-view-widget.md',
    'repo/docs/api-reference/core/widget.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
