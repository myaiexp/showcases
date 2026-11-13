// gsap example: Draggable hitTest drop zones
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Draggable hitTest drop zones',
  summary:
    'Drag chips over two drop zones. A zone lights up while a chip overlaps at least half of it (hitTest with a "50%" threshold) and flashes when you drop.',
  section: 'Draggable',
  tags: ['Draggable', 'hitTest', 'onDrag', 'onDragEnd', 'bounds'],
  docs: [
    'pages/gsap-com/docs/v3/Plugins/Draggable/static-hitTest-.md',
    'pages/gsap-com/docs/v3/Plugins/Draggable.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
