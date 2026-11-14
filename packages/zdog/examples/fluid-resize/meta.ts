// Zdog example: a browser window that scales with its canvas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fluid resize',
  summary:
    'A little browser window drawn on a canvas that fills its box, then shrinks and grows as the box does. With resize: true Illustration measures the element again whenever it changes, and onResize turns the new width into a zoom so the whole model keeps fitting. Drag the width slider to squeeze the box.',
  section: 'API: Illustration',
  tags: ['Illustration', 'resize', 'onResize', 'zoom'],
  docs: ['repo/modules/docs/api-illo.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
