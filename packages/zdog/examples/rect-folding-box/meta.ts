// Zdog example: Folding box, six Rects folding from a flat net into a cube
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Folding box',
  summary:
    'A cardboard box folding itself shut from a flat cross shape. Each face is a Rect, and Rects face front until you rotate them: a quarter turn lays one flat, and nested anchors act as the hinges. Drag the fold slider to close it by hand.',
  section: 'Shapes',
  tags: ['Rect', 'rotate', 'translate', 'Anchor', 'fill'],
  docs: ['repo/modules/docs/shapes-basic.hbs', 'repo/modules/docs/api-anchor.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
