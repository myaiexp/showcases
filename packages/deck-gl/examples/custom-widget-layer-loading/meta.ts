// deck-gl example: a custom widget that watches layer loading through onRedraw
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom widget: onRedraw layer status',
  summary:
    "A custom widget implements onRedraw({viewports, layers}) to list the application's top-level layers (filtering out sublayers by their parent) and whether each isLoaded, re-rendering only when that changes, and reports the overall state through an onLoadingChange prop. The layer's data is a Promise that resolves after a timer.",
  section: 'Custom widgets',
  tags: ['Widget', 'onRedraw', 'isLoaded', 'layers', 'callback prop', 'updateHTML'],
  docs: [
    'repo/docs/developer-guide/custom-widgets/universal-widgets.md',
    'repo/docs/api-reference/core/widget.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
