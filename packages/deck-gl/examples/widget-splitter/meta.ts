// deck-gl example: SplitterWidget
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SplitterWidget',
  summary:
    'The experimental SplitterWidget lays two MapViews out side by side or stacked, and lets you drag the border between them within minSplit and maxSplit. onDragStart, onChange and onDragEnd report the drag.',
  section: 'Widgets',
  tags: ['SplitterWidget', 'viewLayout', 'orientation', 'initialSplit', 'editable', 'minSplit', 'maxSplit', 'onChange'],
  docs: [
    'repo/docs/api-reference/widgets/splitter-widget.md',
    'repo/docs/api-reference/widgets/view-layout.md',
    'repo/docs/api-reference/core/widget.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
