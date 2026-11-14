// deck-gl example: ScrollbarWidget
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ScrollbarWidget',
  summary:
    'Two ScrollbarWidgets scroll an OrthographicView across a 3000 by 700 field of dots. contentBounds sizes the thumbs, stepSize and pageSize set the jumps, and decorations mark places on the track, one of them clickable.',
  section: 'Widgets',
  tags: ['ScrollbarWidget', 'contentBounds', 'orientation', 'stepSize', 'pageSize', 'captureWheel', 'decorations', 'viewId'],
  docs: [
    'repo/docs/api-reference/widgets/scrollbar-widget.md',
    'repo/docs/api-reference/core/widget.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
