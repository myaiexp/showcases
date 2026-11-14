// Zdog example: Open and closed paths, a house outline with or without a floor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Open and closed paths',
  summary:
    'A little house frame made from two outlines joined by rafters. Each outline is a five-point path. Closed paths draw a last line from the final point back to the first, which here is the floor; set closed to false and the floor line disappears. Fill paints the inside.',
  section: 'Shapes',
  tags: ['Shape', 'path', 'closed', 'fill'],
  docs: ['repo/modules/docs/shapes-shape.hbs', 'repo/modules/docs/api-shape.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
