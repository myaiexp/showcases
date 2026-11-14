// Zdog example: Bezier heart, a beating heart from two bezier halves
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bezier heart',
  summary:
    'A beating heart, drawn as two mirrored halves. Each half is a filled Shape whose path starts at the bottom tip and sweeps up round the lobe with two bezier commands, each taking two control points and an end point. The beat is a scale on the parent.',
  section: 'Shapes',
  tags: ['Shape', 'path', 'bezier', 'fill', 'scale'],
  docs: ['repo/modules/docs/shapes-shape.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
