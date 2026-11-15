// cobe example: resizing the globe through update({ width, height })
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Resizing with update()',
  summary:
    'The globe sits in a box you can resize by its corner (in the card the box grows and shrinks on its own). A ResizeObserver passes the new size to update({ width, height }), which resizes the canvas, and the globe always fits the height. The badge shows the CSS size and the canvas size behind it.',
  section: 'Methods',
  tags: ['update', 'width', 'height', 'devicePixelRatio', 'ResizeObserver'],
  docs: ['pages/cobe-vercel-app.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
