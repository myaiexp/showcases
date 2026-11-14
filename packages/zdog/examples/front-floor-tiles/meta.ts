// Zdog example: Floor tiles, the front option with backface false
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Floor tiles',
  summary:
    'A checkerboard floor with a snowman on it. Each tile is a flat shape drawn in the ground plane, and the front option says it faces up. With backface set to false the tiles disappear when you look at the floor from underneath, so only the top side is ever drawn. Tilt the camera through the floor to see it.',
  section: 'API: Shape',
  tags: ['Shape', 'front', 'backface', 'path', 'fill'],
  docs: ['repo/modules/docs/api-shape.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
