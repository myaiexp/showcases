// Zdog example: Arc pipes, a pipe route with rounded bends
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Arc pipes',
  summary:
    'A pipe snaking through 3D, turning left, up, forward and down. Every bend is an arc command: the path runs up to a corner point and the arc curves round it to an end point. Shrink the bend radius to zero and the pipe becomes sharp elbows.',
  section: 'Shapes',
  tags: ['Shape', 'path', 'arc', 'line', 'closed'],
  docs: ['repo/modules/docs/shapes-shape.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
