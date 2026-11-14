// Zdog example: Snowman dots, balls of snow made from path-less shapes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Snowman dots',
  summary:
    'A snowman made almost entirely of dots. A Shape with no path is a single point, and giving it a stroke turns that point into a ball as wide as the stroke. Coal eyes and buttons are small dots, the carrot is a two-point line.',
  section: 'Shapes',
  tags: ['Shape', 'path', 'stroke', 'translate', 'color'],
  docs: ['repo/modules/docs/shapes-shape.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
