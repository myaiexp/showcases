// deck-gl example: LoadingWidget
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'LoadingWidget',
  summary:
    'A spinner shows while any layer is still loading. The layer data is a promise that resolves after a few seconds, with nothing fetched; a button swaps in a new layer and starts the wait again.',
  section: 'Widgets',
  tags: ['LoadingWidget', 'onLoadingChange', 'label', 'data promise'],
  docs: [
    'repo/docs/api-reference/widgets/loading-widget.md',
    'repo/docs/api-reference/core/widget.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
