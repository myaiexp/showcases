// g6 example: FAQ: drag-canvas and brush-select conflict
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'FAQ: drag-canvas and brush-select conflict',
  summary: 'With drag-canvas and brush-select both on, a plain drag pans the canvas and shift plus drag brushes. enable: (event) => event.shiftKey === false on drag-canvas stops the pan while shift is down.',
  section: 'Further Reading',
  tags: ['drag-canvas', 'brush-select', 'enable', 'shiftKey'],
  docs: [
    'repo/packages/site/docs/manual/faq.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
