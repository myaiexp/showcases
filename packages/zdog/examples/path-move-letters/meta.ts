// Zdog example: Pen-lift letters, H I ! drawn with move commands
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pen-lift letters',
  summary:
    'The word "HI!" as chunky 3D letters, each one a single Shape. Between strokes the path uses a move command to lift the pen, so the H is two bars and a crossbar instead of one scribble. Untick the box to see what the path draws without any moves.',
  section: 'Shapes',
  tags: ['Shape', 'path', 'move', 'line', 'closed'],
  docs: ['repo/modules/docs/shapes-shape.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
