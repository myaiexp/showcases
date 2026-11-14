// Zdog example: Constellation lines, stars joined by a 3D path
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Constellation lines',
  summary:
    'Seven stars joined into a constellation, floating at different depths. A Shape path is a list of points, and each point can carry a z value, so a single line can run through 3D space. Slide the depth to flatten the sky or stretch it.',
  section: 'Shapes',
  tags: ['Shape', 'path', 'line', 'closed', 'z'],
  docs: ['repo/modules/docs/shapes-shape.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
