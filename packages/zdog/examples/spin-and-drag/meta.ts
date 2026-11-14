// Zdog example: a product turntable that pauses while you drag it
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Spin & drag',
  summary:
    'A product turntable: the mug spins on its own, you grab it to inspect any side, and it goes back to spinning a moment after you let go. dragRotate does the pointer maths; onDragStart and onDragEnd pause and resume the spin.',
  section: 'Getting started',
  tags: ['dragRotate', 'onDragStart', 'onDragEnd', 'render loop', 'Cylinder'],
  docs: [
    'repo/content/getting-started.hbs',
    'repo/modules/docs/api-dragger.hbs',
    'repo/modules/docs/shapes-composite.hbs',
    'repo/modules/docs/shapes-basic.hbs',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
