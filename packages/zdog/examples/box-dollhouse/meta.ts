// Zdog example: Box dollhouse, a cut-away room with furniture
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Box dollhouse',
  summary:
    'A cut-away dollhouse room. The room is one Box with its front, left and top faces set to false, so there is nothing there to block the view of the bed, the table and the rug inside. Tick the boxes to put the walls and ceiling back.',
  section: 'Shapes',
  tags: ['Box', 'frontFace', 'leftFace', 'topFace', 'rearFace', 'Group', 'Cylinder'],
  docs: ['repo/modules/docs/shapes-composite.hbs', 'repo/modules/docs/group-concept.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
